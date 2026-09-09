// 注音ナビ 共通音声再生コアエンジン (Mac Chrome ＆ GitHub Pages 完全耐性・女性ボイス優先版)
(function(window) {
  let currentAudio = null;
  let activeElement = null;
  let sequenceTimer = null;

  // Mac Chrome 用 WebSpeechAPI Voiceの事前プレロード
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    } catch (e) {}
  }

  function clearActiveAudio() {
    if (sequenceTimer) {
      clearTimeout(sequenceTimer);
      sequenceTimer = null;
    }

    if (activeElement) {
      activeElement.classList.remove('is-playing');
      activeElement = null;
    }

    document.querySelectorAll('.is-playing').forEach(el => el.classList.remove('is-playing'));

    if (currentAudio) {
      try {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.pause();
        currentAudio.src = '';
      } catch (e) {}
      currentAudio = null;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // 中国語文を抽出するヘルパー（日本語訳や記号、接頭辞をカット）
  function extractChineseSentence(text) {
    if (!text) return '';
    let cleaned = text.split(/[\(（]/)[0];
    cleaned = cleaned.replace(/^[💬\s]*例文[:：]?\s*/, '');
    return cleaned.trim();
  }

  // 台湾女性ボイス（Google 國語（臺灣） / Meijia）取得
  function getTaiwanVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    const zhVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith('zh'));
    
    // 1. Google 公式の最高品質台湾ボイス「Google 國語（臺灣）」を最優先マッチ
    let targetVoice = zhVoices.find(v => (v.name || '').includes('Google 國語') || (v.name || '').includes('Google 國語（臺灣）'));

    // 2. なければ Meijia / Shelley 等の台湾女性ボイス
    if (!targetVoice) {
      const priorityVoiceNames = ['meijia', 'shelley', 'sandy', 'flo', 'ting-ting'];
      targetVoice = zhVoices.find(v => {
        const nameLower = (v.name || '').toLowerCase();
        return priorityVoiceNames.some(p => nameLower.includes(p));
      });
    }

    // 3. なければ zh-TW ボイス
    if (!targetVoice) {
      targetVoice = zhVoices.find(v => {
        const langLower = (v.lang || '').toLowerCase();
        return langLower.includes('tw') || langLower.includes('zh-tw');
      });
    }

    return targetVoice || zhVoices[0] || null;
  }

  function playZhuyinSound(text, triggerEl = null) {
    if (!text) return;

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch (e) {}
    }

    clearActiveAudio();

    if (triggerEl) {
      activeElement = triggerEl;
      activeElement.classList.add('is-playing');
    }

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    let speechText = speechMap[text] || text;

    // TTS音声補正: 「滷」は各種音声エンジンで不自然な途切れや誤読が起きやすいため、自然に発音される「魯」に補正
    if (typeof speechText === 'string' && speechText.includes('滷')) {
      speechText = speechText.replace(/滷/g, '魯');
    }

    playWebSpeechFemale(text, speechText);
  }

  function playWebSpeechFemale(originalText, speechText) {
    if (!('speechSynthesis' in window)) {
      playFallbackBeep();
      clearActiveAudio();
      return;
    }

    try {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(speechText || originalText);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.85;
      utterance.pitch = 1.05;

      const voice = getTaiwanVoice();
      if (voice) utterance.voice = voice;

      utterance.onend = () => clearActiveAudio();
      utterance.onerror = (err) => {
        console.warn(`[Audio Engine] Speech error for "${originalText}":`, err);
        playFallbackBeep();
        clearActiveAudio();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('[Audio Engine] Web Speech API error:', e);
      playFallbackBeep();
      clearActiveAudio();
    }
  }

  function playFallbackBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  window.playZhuyinSound = playZhuyinSound;

  // 全ページ共通: .play-word-sound ＆ .play-symbol-sound ＆ .play-example-sound 自動クリック検出
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      // 1. 例文発音ボタン (.play-example-sound)
      const exampleTarget = e.target.closest('.play-example-sound');
      if (exampleTarget && !e.target.closest('.bookmark-btn')) {
        const sentence = exampleTarget.getAttribute('data-sentence') || exampleTarget.innerText;
        const cleanSentence = extractChineseSentence(sentence);
        if (cleanSentence) {
          playZhuyinSound(cleanSentence, exampleTarget);
        }
        return;
      }

      // 2. 単語発音ボタン / 要素 (.play-word-sound)
      const wordTarget = e.target.closest('.play-word-sound');
      if (wordTarget && !e.target.closest('.bookmark-btn')) {
        const word = wordTarget.getAttribute('data-word');
        if (word) {
          playZhuyinSound(word, wordTarget);
        }
        return;
      }

      // 3. 注音符号クリック (.play-symbol-sound)
      const symbolTarget = e.target.closest('.play-symbol-sound');
      if (symbolTarget && !e.target.closest('.bookmark-btn')) {
        const symbol = symbolTarget.getAttribute('data-symbol');
        if (symbol) {
          playZhuyinSound(symbol, symbolTarget);
        }
        return;
      }
    });
  }

  window.APP_VERSION = 'v1.1.0';

  // ==================== 復習単語帳 管理モジュール ====================
  const DEFAULT_REVIEW_WORDS = [
    {
      traditional: '看過',
      zhuyin: 'ㄎㄢˋ ㄍㄨㄛ˙',
      pinyin: 'kànguò',
      meaning: '見たことがある (経験態「過」)',
      example: '我看過這部台灣電影。 (私はこの台湾映画を見たことがあります)',
      column: {
        title: '💡 動詞＋「過」で「〜したことがある（過去の経験）」！',
        content: '• <strong>看 (ㄎㄢˋ)</strong>（見る）＋ <strong>過 (ㄍㄨㄛ˙)</strong>（〜したことがある）。<br>• 動詞の直後に「過」を添えるだけで「過去にその動作を行った経験がある」を表せます（去過＝行ったことがある、吃過＝食べたことがある）。否定形は「沒看過（見たことがない）」です。'
      },
      createdAt: 1788967650000 // 2026/09/10 00:27
    },
    {
      traditional: '數學考試',
      zhuyin: 'ㄕㄨˋ ㄒㄩㄝˊ ㄎㄠˇ ㄕˋ',
      pinyin: 'shùxué kǎoshì',
      meaning: '数学テスト / 数学の試験 (考數學)',
      example: '明天學校有數學考試。 (明日、学校で数学のテストがあります)',
      column: {
        title: '💡 「考試（テスト）」と動詞「考（テストを受ける）」！',
        content: '• <strong>數學 (ㄕㄨˋ ㄒㄩㄝˊ)</strong>＝数学、<strong>考試 (ㄎㄠˇ ㄕˋ)</strong>＝試験・テスト。<br>• 台湾の学校や日常会話では「明天要考數學！（明日数学のテストがある！）」のように「動詞の考＋科目名」の形でも頻繁に使われます。'
      },
      createdAt: 1788967640000 // 2026/09/10 00:27
    },
    {
      traditional: '已經',
      zhuyin: 'ㄧˇ ㄐㄧㄥ',
      pinyin: 'yǐjīng',
      meaning: 'もう / すでに / とっくに',
      example: '我已經吃飽了。 (私はもうお腹いっぱいです)',
      column: {
        title: '💡 完了・変化を表す「已經〜了」の超定番パターン！',
        content: '• 「すでに・もう」を表す副詞。文末の「了 (ㄌㄜ˙)」とペアで「<strong>已經〜了</strong>（もう〜した）」と使うのが日常会話の鉄板フレーズです（例：我已經到了＝もう着きました、他已經出發了＝彼はもう出発しました）。'
      },
      createdAt: 1788967630000 // 2026/09/10 00:27
    },
    {
      traditional: '起床',
      zhuyin: 'ㄑㄧˇ ㄔㄨㄤˊ',
      pinyin: 'qǐchuáng',
      meaning: '起きる / 目覚める / 起床する',
      example: '我每天早上七點起床。 (私は毎朝7時に起きます)',
      column: {
        title: '💡 「起（立つ）」＋「床（ベッド）」で起き上がる！',
        content: '• <strong>起 (ㄑㄧˇ)</strong>（起きる・立ち上がる）＋ <strong>床 (ㄔㄨㄤˊ)</strong>（ベッド・寝床）。<br>• 直訳で「ベッドから起き上がる」という意味です。台湾の朝は早く、街中の朝ごはん屋さん（早餐店）には早くから起きて蛋餅（ダンピン）や豆漿（豆乳）を買いに来る人々で賑わいます。'
      },
      createdAt: 1788967505000 // 2026/09/10 00:25
    },
    {
      traditional: '七夕',
      zhuyin: 'ㄑㄧ ㄒㄧˋ',
      pinyin: 'qīxì',
      meaning: '七夕 (しちせき / 旧暦7月7日) / チャイニーズバレンタインデー',
      example: '七夕是東方的情人節。 (七夕は東洋のバレンタインデーです)',
      column: {
        title: '🇹🇼 台湾の七夕はロマンチックな「恋人たちの日」！',
        content: '• 日本の七夕は短冊に願い事を書く行事ですが、台湾では織姫と彦星の伝説にちなんで「<strong>七夕情人節</strong>」と呼ばれ、恋人同士が食事やデートを楽しむ一大イベントです。<br>• また、縁結びの神様「月下老人（月老）」がいる霞海城隍廟や龍山寺に良縁を祈願しにお参りする人が殺到する日でもあります。'
      },
      createdAt: 1788967504000 // 2026/09/10 00:25
    },
    {
      traditional: '情人節',
      zhuyin: 'ㄑㄧㄥˊ ㄖㄣˊ ㄐㄧㄝˊ',
      pinyin: 'qíngrénjié',
      meaning: 'バレンタインデー / 恋人の日',
      example: '祝大家情人節快樂！ (みなさん、ハッピーバレンタインデー！)',
      column: {
        title: '💐 台湾にはバレンタインが年に2回ある！？',
        content: '• <strong>情人 (ㄑㄧㄥˊ ㄖㄣˊ)</strong>＝恋人・愛する人、<strong>節 (ㄐㄧㄝˊ)</strong>＝祝日・記念日。<br>• 台湾では2月14日の「西洋情人節」と旧暦7月7日の「七夕情人節」の年に2回、盛大に祝われます。日本と異なり、台湾では男性が女性に花束やプレゼントを贈り、高級レストランをご馳走するのが一般的です。'
      },
      createdAt: 1788967503000 // 2026/09/10 00:25
    },
    {
      traditional: '八寶粥',
      zhuyin: 'ㄅㄚ ㄅㄠˇ ㄓㄡ',
      pinyin: 'bābǎozhōu',
      meaning: '八宝粥 (8種の穀物・豆・果実が入った甘い健康粥スイーツ)',
      example: '泰山八寶粥是台灣非常有名のおやつ。 (「泰山八宝粥」は台湾でとても有名なおやつ/缶詰です)',
      column: {
        title: '🥣 台湾人のソウルフード＆常備缶詰スイーツ！',
        content: '• <strong>八寶</strong>（もち米、小豆、緑豆、ハトムギ、ピーナッツ、龍眼など8種の宝物のような健康食材）＋ <strong>粥</strong>（おかゆ）。ほんのり自然な甘みで、温めても冷やしても美味しい台湾伝統スイーツです。<br>• 特にスーパーやコンビニで売られている「泰山八寶粥」の缶詰（蓋に折りたたみスプーン付き！）は国民的定番で、小腹が空いたときや非常食として各家庭に常備されています。'
      },
      createdAt: 1788967502000 // 2026/09/10 00:25
    },
    {
      traditional: '雙十國慶',
      zhuyin: 'ㄕㄨㄤ ㄕˊ ㄍㄨㄛˊ ㄑㄧㄥˋ',
      pinyin: 'shuāngshí guóqìng',
      meaning: '双十国慶節 (10月10日の台湾の建国記念日 / ナショナルデー)',
      example: '十月十日是台灣的雙十國慶。 (10月10日は台湾の双十国慶節です)',
      column: {
        title: '🇹🇼 10月10日は台湾最大の祝日「雙十節」！',
        content: '• <strong>雙十 (ㄕㄨㄤ ㄕˊ)</strong>：10が2つ重なる「10月10日」のこと。<strong>國慶 (ㄍㄨㄛˊ ㄑㄧㄥˋ)</strong>：国家を祝う記念日。<br>• 1911年10月10日の武昌蜂起（辛亥革命）を記念する台湾の建国記念日です。総統府前広場での盛大な軍事パレードや各都市で開催される大迫力の国慶花火大会など、台湾中が祝賀ムードに包まれます。'
      },
      createdAt: 1788967501000 // 2026/09/10 00:25
    },
    {
      traditional: '在寫功課',
      zhuyin: 'ㄗㄞˋ ㄒㄧㄝˇ ㄍㄨㄥ ㄎㄜˋ',
      pinyin: 'zài xiě gōngkè',
      meaning: '宿題をしている (宿題をする)',
      example: '我現在在寫功課。 (私は今、宿題をしています)',
      column: {
        title: '✏️ 「在寫功課」の1文字ずつの漢字分解とニュアンス',
        content: '• <strong>在 (ㄗㄞˋ)</strong>: 動詞の前に置き「〜している最中（進行形＝-ing）」を表す。<br>• <strong>寫 (ㄒㄧㄝˇ)</strong>: 「書く・記す」。手やペンで文字を書く動作。<br>• <strong>功 (ㄍㄨㄥ)</strong>: 「功績・積み重ねる努力・腕前（功夫）」。<br>• <strong>課 (ㄎㄜˋ)</strong>: 「授業・課業・課題（上課・下課の課）」。<br>➔ <strong>「功課 (gōngkè)」</strong>は「授業のために努力を積み重ねるもの＝宿題・課題」という意味になります！台湾では学校の宿題だけでなく、旅行の下調べや仕事のリサーチ・事前勉強も「做功課（下調べをする）」と表現します（🇨🇳 大陸では宿題は「作業 zuòyè」）。'
      },
      createdAt: 1788877500000 // 2026/09/08 23:25
    },
    {
      traditional: '讀書',
      zhuyin: 'ㄉㄨˊ ㄕㄨ',
      pinyin: 'dúshū',
      meaning: '勉強する / 留学する / 本を読む',
      example: '他在國外讀書。 (彼は海外で勉強しています/留学しています)',
      column: {
        title: '💡 「讀書」は「留学・進学」の意味でも大活躍！',
        content: '「本を読む」だけでなく、「学校に通う・勉強する」という意味です。台湾では「去國外讀書（海外に勉強しに行く＝留学する）」と日常的によく表現します。「留學 (ㄌㄧㄡˊ ㄒㄩㄝˊ)」や「念書 (ㄋㄧㄢˋ ㄕㄨ)」も同義です。'
      },
      createdAt: 1788877200000 // 2026/09/08 23:20
    },
    {
      traditional: '歐洲',
      zhuyin: 'ㄡ ㄓㄡ',
      pinyin: 'ōuzhōu',
      meaning: 'ヨーロッパ (欧州)',
      example: '我想去歐洲旅行。 (私はヨーロッパへ旅行に行きたいです)',
      column: {
        title: '💡 台湾華語の世界の大陸・地域名の呼び方',
        content: '「洲 (ㄓㄡ)」は大州のこと。亞洲 (アジア)、美洲 (アメリカ大陸)、歐洲 (ヨーロッパ)、澳洲 (オーストラリア)。「歐 (ㄡ)」は第1声で平らに高く発音します。'
      },
      createdAt: 1788876900000 // 2026/09/08 23:15
    },
    {
      traditional: '一雙筷子',
      zhuyin: 'ㄧˋ ㄕㄨㄤ ㄎㄨㄞˋ ㄗ˙',
      pinyin: 'yì shuāng kuàizi',
      meaning: 'お箸一膳 (おはし)',
      example: '請給我一雙筷子。 (お箸を一膳ください)',
      column: {
        title: '🥢 ペア・対のものは量詞「雙 (ㄕㄨㄤ)」を使う！',
        content: 'お箸、靴、手袋など2本・2個で1組のものは量詞「雙 (shuāng)」で数えます（一雙筷子＝箸一膳、一雙鞋子＝靴一足）。食堂やテイクアウト（外帶）でお箸をもらうときは「請給我一雙筷子！」と言えばバッチリ通じます。'
      },
      createdAt: 1788876600000 // 2026/09/08 23:10
    },
    {
      traditional: '教室',
      zhuyin: 'ㄐㄧㄠˋ ㄕˋ',
      pinyin: 'jiàoshì',
      meaning: '教室 / クラスルーム',
      example: '這是我們的中文教室。 (ここは私たちの中国語の教室です)',
      column: {
        title: '💡 「教」も「室」も第4声！強く下降調で発音する',
        content: '「教」は動詞「教える（教書）」では第1声（ㄐㄧㄠ / jiāo）ですが、「教室」「教師」「教育」など名詞・熟語では第4声（ㄐㄧㄠˋ / jiào）に変化します。「室 (ㄕˋ)」も第4声なので「ジャーオ！シー！」と力強く発音します。'
      },
      createdAt: 1788875548000 // 2026/09/08 22:52
    },
    {
      traditional: '上班族',
      zhuyin: 'ㄕㄤˋ ㄅㄢ ㄗㄨˊ',
      pinyin: 'shàngbānzú',
      meaning: 'サラリーマン / 会社員 / オフィスワーカー',
      example: '很多台灣上班族每天喝珍珠奶茶。 (多くの台湾の会社員は毎日タピオカミルクティーを飲みます)',
      column: {
        title: '🇹🇼 「上班（出勤）」＋「族（〜な人たち）」',
        content: '台湾では会社勤めの人を「上班族 (ㄕㄤˋ ㄅㄢ ㄗㄨˊ)」と呼びます。「族」は同じライフスタイルや属性を表す接尾辞で、「小資族（プチリッチ女子・若手社員）」や「追劇族（ドラマ一気見勢）」など台湾社会で大人気です。'
      },
      createdAt: 1788186821000 // 2026/08/31 23:33
    },
    {
      traditional: '粉紅色',
      zhuyin: 'ㄈㄣˇ ㄏㄨㄥˊ ㄙㄜˋ',
      pinyin: 'fěnhóngsè',
      meaning: 'ピンク色 / 桃色',
      example: '阿里山的櫻花是粉紅色的。 (阿里山の桜はピンク色です)',
      column: {
        title: '💡 パステル調の淡い赤＝ピンク色！',
        content: '「粉 (ㄈㄣˇ)」はおしろいや粉末、淡いパステル調を意味し、「紅 (ㄏㄨㄥˊ)」は赤。合わさって「淡い赤＝ピンク色」になります。台湾のドリンクスタンドやカフェでも「粉紅〜」のメニューをよく見かけます。'
      },
      createdAt: 1788186820000 // 2026/08/31 23:33
    },
    {
      traditional: '打擾',
      zhuyin: 'ㄉㄚˇ ㄖㄠˇ',
      pinyin: 'dǎrǎo',
      meaning: '失礼する / お邪魔する / 邪魔する',
      example: '不好意思，打擾一下！ (すみません、ちょっと失礼します/お邪魔します！)',
      column: {
        title: '💡 「打」＋「擾」のそれぞれの漢字の意味',
        content: '• <strong>打</strong>（対象に働きかける接頭語的動詞）＋ <strong>擾</strong>（手へん＋憂＝相手の平穏や静寂を乱す）。<br>• 直訳すると「相手の落ち着いた状態をかき乱す」＝「お邪魔する」。人にお願いするときや声をかけるときは「不好意思，打擾一下！」が台湾人の鉄板フレーズです。'
      },
      createdAt: 1788101521000 // 2026/08/30 23:52
    },
    {
      traditional: '鳳梨酥',
      zhuyin: 'ㄈㄥˋ ㄌㄧˊ ㄙㄨ',
      pinyin: 'fènglísū',
      meaning: 'パイナップルケーキ (台湾名物のお菓子)',
      example: '這是台灣很有名的鳳梨酥。 (これは台湾でとても有名なパイナップルケーキです)',
      column: {
        title: '🍍 漢字分解と台湾語「旺來（オンライ）」の大吉祥文化',
        content: '• <strong>鳳</strong>（鳳凰の尾羽のようなトゲトゲの葉）＋ <strong>梨</strong>（梨のようなみずみずしい果肉）＋ <strong>酥</strong>（口の中でホロホロ崩れるサクサク焼き菓子）。<br>• パイナップルの台湾語「旺來 (ông-lâi)」は「運気がぐんぐん栄えてやってくる（繁盛する）」と同じ音！そのため開店祝い・春節・手土産の定番吉祥菓子として愛されています（🇨🇳 大陸では「菠蘿酥」）。'
      },
      createdAt: 1788101520000 // 2026/08/30 23:52
    },
    {
      traditional: '同學',
      zhuyin: 'ㄊㄨㄥˊ ㄒㄩㄝˊ',
      pinyin: 'tóngxué',
      meaning: '同級生 / クラスメイト',
      example: '他是我的中文班同學。 (彼は私の中国語クラスの同級生です)',
      column: {
        title: '💡 「同じ学校・講座で学ぶ仲間」',
        content: '学校のクラスメイトだけでなく、中国語スクールやセミナーの同期も「同學 (ㄊㄨㄥˊ ㄒㄩㄝˊ)」です。「老同學（昔からの同級生）」のように親しみを込めて呼び合います。先生が生徒全員に呼びかけるときも「同學〜！」と言います。'
      },
      createdAt: 1788101519000 // 2026/08/30 23:52
    },
    {
      traditional: '慢用',
      zhuyin: 'ㄇㄢˋ ㄩㄥˋ',
      pinyin: 'mànyòng',
      meaning: 'ゆっくりする / ごゆっくりどうぞ',
      example: '請慢用！ (ごゆっくりお召し上がりください！/ ごゆっくりどうぞ！)',
      column: {
        title: '🇹🇼 「ゆっくり」の台湾使い分けコラム',
        content: '• <strong>慢用 (mànyòng)</strong>：食事やお茶を出すときに「ごゆっくり召し上がれ」。<br>• <strong>漫遊 (mànyóu)</strong>：街や観光地をのんびり散策・ぶらぶら歩く（例：台北漫遊）。<br>• <strong>慢活 (mànhuó)</strong>：のんびりスローライフを送る。'
      },
      createdAt: 1787758310000 // 2026/08/27 00:31
    },
    {
      traditional: '捷運站',
      zhuyin: 'ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ',
      pinyin: 'jiéyùnzhàn',
      meaning: 'MRT駅 (地下鉄・都市鉄道の駅)',
      example: '捷運站在哪裡？ (MRTの駅はどこですか？)',
      column: {
        title: '🚇 「捷運」の語源と「站」の意味',
        content: '• 英語の <strong>MRT (Mass Rapid Transit)</strong> の訳。<strong>捷</strong>（すばやい・敏捷）＋<strong>運</strong>（輸送・運行）＝「すばやく運ぶ高速都市輸送システム」。地下でも高架路線でも「捷運」と呼びます（🇨🇳 大陸では「地鐵」）。<br>• <strong>站</strong>（ㄓㄢˋ）は駅・停留所のこと（火車站＝電車の駅、高鐵站＝新幹線の駅、公車站＝バス停）。'
      },
      createdAt: 1787758309000 // 2026/08/27 00:31
    },
    {
      traditional: '最近',
      zhuyin: 'ㄗㄨㄟˋ ㄐㄧㄣˋ',
      pinyin: 'zuìjìn',
      meaning: '最近',
      example: '最近你好嗎？ (最近調子はどうですか？)',
      column: {
        title: '💡 日常会話の挨拶定番「最近好嗎？」',
        content: '「最近好嗎？ (ㄗㄨㄟˋ ㄐㄧㄣˋ ㄏㄠˇ ㄇㄚ˙)」は久しぶりに会った友人やチャットの冒頭で「最近どう？元気にしてる？」と声をかけるときの超定番フレーズです。'
      },
      createdAt: 1787758308000 // 2026/08/27 00:31
    },
    {
      traditional: '護照',
      zhuyin: 'ㄏㄨˋ ㄓㄠˋ',
      pinyin: 'hùzhào',
      meaning: 'パスポート',
      example: '我的護照在哪裡？ (私のパスポートはどこですか？)',
      column: {
        title: '💡 「護（守る）」＋「照（証明・照会）」',
        content: '旅行中に自らの身元を保護・証明する公的書類。「護照 (ㄏㄨˋ ㄓㄠˋ)」は台湾旅行中の免税手続き（退稅）やホテルチェックインなどで必ず提示します。'
      },
      createdAt: 1787758307000 // 2026/08/27 00:31
    }
  ];

  const STORAGE_KEY = 'taiwan_chinese_review_words_v12';

  const ReviewManager = {
    getWords: function() {
      try {
        let savedWords = null;
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try { savedWords = JSON.parse(raw); } catch (e) { savedWords = null; }
        }

        // 最新キーがなければ過去のバージョンから引き継ぎ
        if (!savedWords || !Array.isArray(savedWords)) {
          const oldKeys = [
            'taiwan_chinese_review_words_v11',
            'taiwan_chinese_review_words_v10',
            'taiwan_chinese_review_words_v9',
            'taiwan_chinese_review_words_v8',
            'taiwan_chinese_review_words_v7',
            'taiwan_chinese_review_words_v6',
            'taiwan_chinese_review_words_v5',
            'taiwan_chinese_review_words_v4',
            'taiwan_chinese_review_words_v3',
            'taiwan_chinese_review_words_v2',
            'taiwan_chinese_review_words_v1'
          ];
          for (const k of oldKeys) {
            const oldRaw = localStorage.getItem(k);
            if (oldRaw) {
              try {
                const parsed = JSON.parse(oldRaw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  savedWords = parsed;
                  break;
                }
              } catch (e) {}
            }
          }
        }

        if (!savedWords || !Array.isArray(savedWords)) {
          savedWords = [...DEFAULT_REVIEW_WORDS];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWords));
          return savedWords;
        }

        // DEFAULT_REVIEW_WORDS にある新単語が savedWords に含まれていない場合は先頭に自動マージ！
        const existingSet = new Set(savedWords.map(w => w.traditional));
        const missingDefaults = DEFAULT_REVIEW_WORDS.filter(dw => !existingSet.has(dw.traditional));
        
        let merged = missingDefaults.length > 0 ? [...missingDefaults, ...savedWords] : savedWords;

        // 既存の単語にも DEFAULT_REVIEW_WORDS の正確なコミット追加日・最新コラム・例文データを補完反映！
        merged = merged.map(w => {
          const def = DEFAULT_REVIEW_WORDS.find(dw => dw.traditional === w.traditional);
          if (def) {
            return {
              ...def,
              ...w,
              createdAt: def.createdAt, // 正確なGit履歴上の追加日タイムスタンプを確実に適用
              column: def.column,
              example: def.example,
              meaning: def.meaning,
              zhuyin: def.zhuyin,
              pinyin: def.pinyin
            };
          }
          return w;
        });

        // 新しい順（降順）にソート
        merged.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      } catch (e) {
        return DEFAULT_REVIEW_WORDS;
      }
    },

    saveWords: function(words) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
      } catch (e) {}
    },

    isReviewWord: function(trad) {
      const words = this.getWords();
      return words.some(w => w.traditional === trad);
    },

    toggleWord: function(wordObj) {
      let words = this.getWords();
      const index = words.findIndex(w => w.traditional === wordObj.traditional);
      let isAdded = false;
      if (index >= 0) {
        words.splice(index, 1);
        isAdded = false;
      } else {
        wordObj.createdAt = Date.now(); // 登録日時（新しいものが上）
        words.unshift(wordObj);
        isAdded = true;
      }
      this.saveWords(words);
      return isAdded;
    },

    removeWord: function(trad) {
      let words = this.getWords();
      words = words.filter(w => w.traditional !== trad);
      this.saveWords(words);
    },

    formatDate: function(timestamp) {
      if (!timestamp) return '';
      const d = new Date(timestamp);
      if (isNaN(d.getTime())) return '';
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}/${m}/${day}`;
    }
  };

  window.ReviewManager = ReviewManager;

  // ブックマークボタンの自動クリックバインド
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.bookmark-btn');
      if (btn) {
        e.stopPropagation();
        const trad = btn.getAttribute('data-trad');
        const zhuyin = btn.getAttribute('data-zhuyin') || '';
        const pinyin = btn.getAttribute('data-pinyin') || '';
        const meaning = btn.getAttribute('data-meaning') || '';
        const example = btn.getAttribute('data-example') || '';

        if (trad) {
          const isAdded = ReviewManager.toggleWord({
            traditional: trad,
            zhuyin: zhuyin,
            pinyin: pinyin,
            meaning: meaning,
            example: example
          });
          btn.classList.toggle('active', isAdded);
          btn.textContent = isAdded ? '⭐' : '☆';
        }
      }
    });
  }

  // 画面フッターの端にバージョン表記 (v1.1.0) を自動描画
  function renderVersionBadge() {
    if (typeof document === 'undefined') return;
    const footerContainer = document.querySelector('.footer .container') || document.querySelector('.footer');
    if (footerContainer && !footerContainer.querySelector('.version-badge')) {
      const badge = document.createElement('span');
      badge.className = 'version-badge';
      badge.textContent = window.APP_VERSION;
      footerContainer.appendChild(badge);
    }
  }

  // ==================== 目次サイドバー＆ScrollSpy制御 ====================
  function initSidebarTOC() {
    if (typeof document === 'undefined') return;

    const sidebarNav = document.getElementById('sidebar-nav');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const links = document.querySelectorAll('.sidebar-link[data-target]');

    // モバイル用ドロワー開閉
    const openDrawer = () => {
      if (sidebarNav) sidebarNav.classList.add('open');
      if (overlay) overlay.classList.add('active');
    };
    const closeDrawer = () => {
      if (sidebarNav) sidebarNav.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // スムーススクロール＆クリック時クローズ
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          closeDrawer();
        }
      });
    });

    // ScrollSpy（スクロール位置に応じたアクティブハイライト）
    if ('IntersectionObserver' in window && links.length > 0) {
      const sections = [];
      links.forEach(link => {
        const targetId = link.getAttribute('data-target');
        const el = document.getElementById(targetId);
        if (el) sections.push(el);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(link => {
              const targetId = link.getAttribute('data-target');
              if (targetId === id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(sec => observer.observe(sec));
    }
  }

  if (typeof document !== 'undefined') {
    const onReady = () => {
      renderVersionBadge();
      initSidebarTOC();
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

})(window);

