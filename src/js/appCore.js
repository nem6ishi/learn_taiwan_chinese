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
    // 1. Google TTS (高音質台湾女性ボイス) を最優先で試行
    playGoogleTTSPrimary(originalText, speechText);
  }

  function playGoogleTTSPrimary(originalText, speechText) {
    // client=tw-ob および client=gtx の両エンドポイントを準備 (gtx は Chrome CORS に強い)
    const encodedText = encodeURIComponent(speechText);
    const primaryUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=zh-TW&client=tw-ob`;
    const fallbackUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=zh-TW&q=${encodedText}`;

    try {
      const audio = new Audio();
      audio.referrerPolicy = 'no-referrer';
      currentAudio = audio;

      let hasTriedFallbackUrl = false;

      const attemptFallbackEngine = () => {
        if (!hasTriedFallbackUrl) {
          hasTriedFallbackUrl = true;
          // gtx エンドポイントで再試行
          audio.src = fallbackUrl;
          const p = audio.play();
          if (p !== undefined) {
            p.catch(() => fallbackWebSpeechFemale(originalText, speechText));
          }
        } else {
          // Google TTS が両方ダメだった場合のみ Web Speech API へ
          fallbackWebSpeechFemale(originalText, speechText);
        }
      };

      audio.onerror = () => attemptFallbackEngine();
      audio.onended = () => clearActiveAudio();

      audio.src = primaryUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => attemptFallbackEngine());
      }

    } catch (err) {
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
      utterance.rate = 0.85;
      utterance.pitch = 1.05;

      utterance.onend = () => clearActiveAudio();
      utterance.onerror = () => {
        playFallbackBeep();
        clearActiveAudio();
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const zhVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith('zh'));
        const priorityVoiceNames = ['meijia', 'google 國語（臺灣）', 'google 國語', 'shelley', 'sandy', 'flo', 'ting-ting'];
        
        let targetVoice = zhVoices.find(v => {
          const nameLower = (v.name || '').toLowerCase();
          return priorityVoiceNames.some(p => nameLower.includes(p));
        });

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
