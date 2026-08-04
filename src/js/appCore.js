// 注音ナビ 共通音声再生コアエンジン (完全静的スタンドアロン対応)
(function(window) {
  let currentAudio = null;

  function playZhuyinSound(text) {
    if (!text) return;

    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;

    try {
      const audio = new Audio(ttsUrl);
      currentAudio = audio;

      let fallbackTriggered = false;

      const doFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          currentAudio = null;
          fallbackWebSpeech(text, speechText);
        }
      };

      audio.onerror = () => {
        console.warn(`[Audio Engine] TTS error for "${text}", switching fallback.`);
        doFallback();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[Audio Engine] Playback error for "${text}":`, err);
          doFallback();
        });
      }

    } catch (err) {
      console.warn(`[Audio Engine] Exception for "${text}":`, err);
      fallbackWebSpeech(text, speechText);
    }
  }

  function fallbackWebSpeech(originalText, speechText) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText || originalText);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.8;

        const voices = window.speechSynthesis.getVoices();
        const twVoice = voices.find(v => v.lang && (v.lang.includes('TW') || v.lang.includes('tw')));
        if (twVoice) utterance.voice = twVoice;

        utterance.onerror = () => {
          playFallbackBeep();
        };

        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 50);
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
    } catch (e) {
      console.error('[Audio Engine] Tone generator error:', e);
    }
  }

  // グローバルに公開
  window.playZhuyinSound = playZhuyinSound;

})(window);
