// 注音ナビ 共通音声再生コアエンジン (完全安定化・堅牢版)
(function(window) {
  let currentAudio = null;
  let playTimeout = null;

  /**
   * 音声インスタンスとタイマーの完全クリア処理
   */
  function clearActiveAudio() {
    if (playTimeout) {
      clearTimeout(playTimeout);
      playTimeout = null;
    }

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

  /**
   * 台湾華語（zh-TW）音声再生メイン処理 (連打・競合対策済み)
   */
  function playZhuyinSound(text) {
    if (!text) return;

    // 前回の再生を確実に停止
    clearActiveAudio();

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

    // デバウンスを僅かに入れて連打によるリクエスト競合を防止
    playTimeout = setTimeout(() => {
      executePlayGoogleTTS(text, speechText);
    }, 20);
  }

  function executePlayGoogleTTS(originalText, speechText) {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;

    try {
      const audio = new Audio();
      currentAudio = audio;

      let fallbackTriggered = false;

      const triggerFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          clearActiveAudio();
          fallbackWebSpeechFemale(originalText, speechText);
        }
      };

      audio.onerror = (e) => {
        console.warn(`[Audio Engine] Google TTS error for "${originalText}" (${speechText}):`, e);
        triggerFallback();
      };

      audio.onended = () => {
        if (currentAudio === audio) {
          currentAudio = null;
        }
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

  // バックアップ用 Web Speech API (台湾女性声優先)
  function fallbackWebSpeechFemale(originalText, speechText) {
    if (!('speechSynthesis' in window)) {
      playFallbackBeep();
      return;
    }

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

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('[Audio Engine] Web Speech API error:', e);
      playFallbackBeep();
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
