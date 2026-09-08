// 注音ナビ 共通音声再生コアエンジン (Mac Chrome ＆ GitHub Pages 完全耐性・女性ボイス優先版)
(function(window) {
  let currentAudio = null;
  let activeElement = null;

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
    const speechText = speechMap[text] || text;

    // 即時同期タイミングで発声処理を呼び出し (Chrome User Gesture 保持)
    executePlayAudio(text, speechText);
  }

  function executePlayAudio(originalText, speechText) {
    // 外部通信ブロックを回避し、Mac Chrome / iOS Safari 等の組み込み Google 國語（臺灣） / Meijia ボイスで高音質発声
    playWebSpeechFemale(originalText, speechText);
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

      utterance.onend = () => clearActiveAudio();
      utterance.onerror = (err) => {
        console.warn(`[Audio Engine] Speech error for "${originalText}":`, err);
        playFallbackBeep();
        clearActiveAudio();
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
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

        if (!targetVoice) {
          targetVoice = zhVoices[0];
        }

        if (targetVoice) {
          utterance.voice = targetVoice;
        }
      }

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

  // 全ページ共通: .play-word-sound ＆ .play-symbol-sound 自動クリック検出
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      const wordTarget = e.target.closest('.play-word-sound');
      if (wordTarget) {
        const word = wordTarget.getAttribute('data-word');
        if (word) {
          playZhuyinSound(word, wordTarget);
        }
        return;
      }

      const symbolTarget = e.target.closest('.play-symbol-sound');
      if (symbolTarget) {
        const symbol = symbolTarget.getAttribute('data-symbol');
        if (symbol) {
          playZhuyinSound(symbol, symbolTarget);
        }
        return;
      }
    });
  }

  window.APP_VERSION = 'v1.1.0';

  // ==================== 難しかった単語 (復習ノート) 管理モジュール ====================
  const DEFAULT_REVIEW_WORDS = [
    {
      traditional: '在寫功課',
      zhuyin: 'ㄗㄞˋ ㄒㄧㄝˇ ㄍㄨㄥ ㄎㄜˋ',
      pinyin: 'zài xiě gōngkè',
      meaning: '宿題をしている (宿題をする)',
      example: '我現在在寫功課。 (私は今、宿題をしています)',
      column: {
        title: '🇹🇼 台湾では「功課」、🇨🇳 大陸では「作業」',
        content: '台湾の学校や日常会話で「宿題をする」は「寫功課 (ㄒㄧㄝˇ ㄍㄨㄥ ㄎㄜˋ)」と言うのが定番です（大陸では「寫作業」）。また動詞の前に「在」をつけると「〜している最中（進行形）」を表します。'
      },
      createdAt: 1700000015000
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
      createdAt: 1700000014000
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
      createdAt: 1700000013000
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
      createdAt: 1700000012000
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
      createdAt: 1700000011000
    },
    {
      traditional: '上班族',
      zhuyin: 'ㄕㄤˋ ㄅㄢ ㄗㄨˊ',
      pinyin: 'shàngbānzú',
      meaning: 'サラリーマン / 会社員 / オフィスワーカー',
      example: '捷運上有很多通勤的上班族。 (MRTには通勤するサラリーマンがたくさん乗っています)',
      column: {
        title: '🇹🇼 「上班（出勤）」＋「族（〜な人たち）」',
        content: '台湾では会社勤めの人を「上班族 (ㄕㄤˋ ㄅㄢ ㄗㄨˊ)」と呼びます。「族」は同じライフスタイルや属性を表す接尾辞で、「小資族（プチリッチ女子・若手社員）」や「追劇族（ドラマ一気見勢）」など台湾社会で大人気です。'
      },
      createdAt: 1700000009000
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
      createdAt: 1700000008000
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
      createdAt: 1700000007000
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
      createdAt: 1700000006000
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
      createdAt: 1700000005000
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
      createdAt: 1700000004000
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
      createdAt: 1700000003000
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
      createdAt: 1700000002000
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
      createdAt: 1700000001000
    }
  ];

  const STORAGE_KEY = 'taiwan_chinese_review_words_v7';

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

        // 既存の単語にも DEFAULT_REVIEW_WORDS の最新コラム・例文データを補完反映！
        merged = merged.map(w => {
          const def = DEFAULT_REVIEW_WORDS.find(dw => dw.traditional === w.traditional);
          if (def) {
            return {
              ...def,
              ...w,
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

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderVersionBadge);
    } else {
      renderVersionBadge();
    }
  }

})(window);

