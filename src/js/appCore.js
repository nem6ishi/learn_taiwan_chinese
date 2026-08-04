// 注音ナビ 共通音声再生コアエンジン (一貫した統一ボイス制御版)
(function(window) {
  let currentAudio = null;

  // 統一ボイスキャッシュ
  let preferredTwVoice = null;

  // OS標準の台湾華語（zh-TW）ボイスの中から、最も自然で明瞭な統一ボイス（例: Mei-Jia, Sin-Ji）を検索・固定
  function getBestTaiwanVoice() {
    if (preferredTwVoice) return preferredTwVoice;

    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      // 1. 台湾標準ボイス名（Mei-Jia, Sin-Ji, Ting-Ting など）を優先
      const namedVoice = voices.find(v => 
        (v.lang === 'zh-TW' || v.lang === 'zh_TW') &&
        (v.name.includes('Mei-Jia') || v.name.includes('Sin-Ji') || v.name.includes('Ting-Ting') || v.name.includes('Yating'))
      );
      if (namedVoice) {
        preferredTwVoice = namedVoice;
        return preferredTwVoice;
      }

      // 2. zh-TW または zh_TW 完全一致ボイス
      const exactTw = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh_TW');
      if (exactTw) {
        preferredTwVoice = exactTw;
        return preferredTwVoice;
      }

      // 3. その他 TW が含まれるボイス
      const twIncludes = voices.find(v => v.lang && v.lang.toLowerCase().includes('tw'));
      if (twIncludes) {
        preferredTwVoice = twIncludes;
        return preferredTwVoice;
      }
    }
    return null;
  }

  // ボイス変更イベントの監視
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      preferredTwVoice = null;
      getBestTaiwanVoice();
    };
  }

  function playZhuyinSound(text) {
    if (!text) return;

    // 再生中の既存オーディオをクリア
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

    // Web Speech API（特定された同一の固定ボイス）を最優先で発声させ、声質ブレを防止
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel(); // 前のキューをリセット

        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.82; // 聞き取りやすい統一スピード
        utterance.pitch = 1.0; // 統一ピッチ
        utterance.volume = 1.0;

        const twVoice = getBestTaiwanVoice();
        if (twVoice) {
          utterance.voice = twVoice;
        }

        // Web Speech API が正常に発話できる場合
        let spoken = false;

        utterance.onstart = () => {
          spoken = true;
        };

        utterance.onerror = (e) => {
          console.warn('[Audio Engine] SpeechSynthesis utterance error:', e);
          if (!spoken) {
            playGoogleTTS(speechText);
          }
        };

        // 発音開始（遅延を入れて安定化）
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 40);

        return;
      } catch (err) {
        console.warn('[Audio Engine] SpeechSynthesis failed, fallback to Google TTS:', err);
      }
    }

    // Web Speech API が非対応の場合のみ Google TTS を利用
    playGoogleTTS(speechText);
  }

  // Google Translate TTS
  function playGoogleTTS(speechText) {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;
    try {
      const audio = new Audio(ttsUrl);
      currentAudio = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn('[Audio Engine] Google TTS play error:', e);
          playFallbackBeep();
        });
      }
    } catch (e) {
      playFallbackBeep();
    }
  }

  // トーン音フォールバック
  function playFallbackBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.error('[Audio Engine] Tone generator error:', e);
    }
  }

  window.playZhuyinSound = playZhuyinSound;

})(window);
