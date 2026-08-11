// 注音ナビ 共通音声再生コアエンジン (完全安定化 ＆ 音波イコライザー連動版)
(function(window) {
  let currentAudio = null;
  let playTimeout = null;
  let activeElement = null;

  function clearActiveAudio() {
    if (playTimeout) {
      clearTimeout(playTimeout);
      playTimeout = null;
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

  function playZhuyinSound(text, triggerEl = null) {
    if (!text) return;

    clearActiveAudio();

    if (triggerEl) {
      activeElement = triggerEl;
      activeElement.classList.add('is-playing');
    }

    // ブラウザの Web Speech API のユーザー操作権限 (User Gesture) をタップ直後に解放・準備
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch (e) {}
    }

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

    playTimeout = setTimeout(() => {
      executePlayGoogleTTS(text, speechText);
    }, 10);
  }

  function executePlayGoogleTTS(originalText, speechText) {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;

    try {
      const audio = new Audio();
      // ★ GitHub Pages (HTTPS) で Referer ヘッダーによる Google TTS 403/CORS ブロックを回避
      audio.referrerPolicy = 'no-referrer';
      currentAudio = audio;

      let fallbackTriggered = false;

      const triggerFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          fallbackWebSpeechFemale(originalText, speechText);
        }
      };

      audio.onerror = (e) => {
        console.warn(`[Audio Engine] Google TTS error for "${originalText}" (${speechText}):`, e);
        triggerFallback();
      };

      audio.onended = () => {
        clearActiveAudio();
      };

      audio.src = ttsUrl;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[Audio Engine] Play catch error for "${originalText}":`, err);
          triggerFallback();
        });
      }

    } catch (err) {
      console.warn(`[Audio Engine] Audio init exception for "${originalText}":`, err);
      fallbackWebSpeechFemale(originalText, speechText);
    }
  }

  function fallbackWebSpeechFemale(originalText, speechText) {
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
      utterance.rate = 0.82;
      utterance.pitch = 1.05;

      utterance.onend = () => clearActiveAudio();
      utterance.onerror = () => clearActiveAudio();

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

})(window);
