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
    // 1. Web Speech API (speechSynthesis) を最優先で即時再生 (Mac Chrome / iOS Safari 完全対応)
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText || originalText);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.85;
        utterance.pitch = 1.05;

        utterance.onend = () => clearActiveAudio();
        utterance.onerror = (err) => {
          console.warn(`[Audio Engine] Web Speech error for "${originalText}":`, err);
          fallbackGoogleTTS(originalText, speechText);
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const femaleKeywords = ['mei-jia', 'ting-ting', 'sin-ji', 'yating', 'female', '美佳', '婷婷', 'taiwan', '國語', 'zh-tw'];
          
          // 1. 台湾女性ボイスを検索
          let targetVoice = voices.find(v => {
            const nameLower = (v.name || '').toLowerCase();
            const langLower = (v.lang || '').toLowerCase();
            return (langLower.includes('tw') || langLower.includes('zh-tw')) &&
                   femaleKeywords.some(kw => nameLower.includes(kw));
          });

          // 2. 台湾一般ボイス
          if (!targetVoice) {
            targetVoice = voices.find(v => {
              const langLower = (v.lang || '').toLowerCase();
              return langLower.includes('tw') || langLower.includes('zh-tw');
            });
          }

          // 3. 中国語一般ボイス
          if (!targetVoice) {
            targetVoice = voices.find(v => (v.lang || '').toLowerCase().startsWith('zh'));
          }

          if (targetVoice) {
            utterance.voice = targetVoice;
          }
        }

        window.speechSynthesis.speak(utterance);
        return; // Web Speech API での再生が開始成功
      } catch (e) {
        console.warn('[Audio Engine] Web Speech API exception, falling back to Google TTS:', e);
      }
    }

    // 2. Web Speech API 非対応時または失敗時に Google TTS へフォールバック
    fallbackGoogleTTS(originalText, speechText);
  }

  function fallbackGoogleTTS(originalText, speechText) {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;

    try {
      const audio = new Audio();
      audio.referrerPolicy = 'no-referrer';
      currentAudio = audio;

      audio.onerror = (e) => {
        console.warn(`[Audio Engine] Google TTS error for "${originalText}":`, e);
        playFallbackBeep();
        clearActiveAudio();
      };

      audio.onended = () => {
        clearActiveAudio();
      };

      audio.src = ttsUrl;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[Audio Engine] Google TTS play catch for "${originalText}":`, err);
          playFallbackBeep();
          clearActiveAudio();
        });
      }

    } catch (err) {
      console.warn(`[Audio Engine] Google TTS exception for "${originalText}":`, err);
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

})(window);
