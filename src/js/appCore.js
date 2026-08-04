// 注音ナビ 共通音声再生コアエンジン (Google Translate TTS 女性ボイス優先版)
(function(window) {
  let currentAudio = null;

  /**
   * 台湾華語（zh-TW）高音質ストリーミング再生（Google Translate TTS 優先）
   */
  function playZhuyinSound(text) {
    if (!text) return;

    // 再生中の音があれば即座にリセット・停止
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

    // Google Translate TTS の台湾女性ボイスストリーミングURL
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;

    try {
      const audio = new Audio(ttsUrl);
      currentAudio = audio;

      let fallbackTriggered = false;

      const doFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          currentAudio = null;
          fallbackWebSpeechFemale(text, speechText);
        }
      };

      audio.onerror = (e) => {
        console.warn(`[Audio Engine] Google TTS error for "${text}", switching fallback.`, e);
        doFallback();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[Audio Engine] Google TTS play blocked for "${text}":`, err);
          doFallback();
        });
      }

    } catch (err) {
      console.warn(`[Audio Engine] Audio creation failed for "${text}":`, err);
      fallbackWebSpeechFemale(text, speechText);
    }
  }

  // バックアップ用 Web Speech API (女性ボイス優先)
  function fallbackWebSpeechFemale(originalText, speechText) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText || originalText);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.82;
        utterance.pitch = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const femaleKeywords = ['mei-jia', 'ting-ting', 'sin-ji', 'yating', 'female', '美佳', '婷婷'];
        const femaleVoice = voices.find(v => {
          const nameLower = (v.name || '').toLowerCase();
          const langLower = (v.lang || '').toLowerCase();
          return (langLower.includes('tw') || langLower.includes('zh-tw')) &&
                 femaleKeywords.some(kw => nameLower.includes(kw));
        });

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 40);
        return;
      } catch (e) {
        console.error('[Audio Engine] Web Speech API error:', e);
      }
    }
    playFallbackBeep();
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
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  window.playZhuyinSound = playZhuyinSound;

})(window);
