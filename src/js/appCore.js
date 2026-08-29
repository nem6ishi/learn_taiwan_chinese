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
      traditional: '慢用',
      zhuyin: 'ㄇㄢˋ ㄩㄥˋ',
      pinyin: 'mànyòng',
      meaning: 'ゆっくりする / ごゆっくりどうぞ',
      example: '請慢用！ (ごゆっくりお召し上がりください！/ ごゆっくりどうぞ！ 💡 のんびり街歩きは「漫遊 mànyóu」)',
      createdAt: 1700000004000
    },
    {
      traditional: '捷運站',
      zhuyin: 'ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ',
      pinyin: 'jiéyùnzhàn',
      meaning: 'MRT駅 (地下鉄・都市鉄道の駅)',
      example: '捷運站在哪裡？ (MRTの駅はどこですか？)',
      createdAt: 1700000003000
    },
    {
      traditional: '最近',
      zhuyin: 'ㄗㄨㄟˋ ㄐㄧㄣˋ',
      pinyin: 'zuìjìn',
      meaning: '最近',
      example: '最近你好嗎？ (最近調子はどうですか？)',
      createdAt: 1700000002000
    },
    {
      traditional: '護照',
      zhuyin: 'ㄏㄨˋ ㄓㄠˋ',
      pinyin: 'hùzhào',
      meaning: 'パスポート',
      example: '我的護照在哪裡？ (私のパスポートはどこですか？)',
      createdAt: 1700000001000
    }
  ];

  const STORAGE_KEY = 'taiwan_chinese_review_words_v2';

  const ReviewManager = {
    getWords: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REVIEW_WORDS));
          return DEFAULT_REVIEW_WORDS;
        }
        let words = JSON.parse(raw);
        // 新しいものが上（先頭）、古いものが下（末尾）になるよう降順ソート
        words.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        return words;
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

