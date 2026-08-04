// 注音ナビ 共通音声再生コアエンジン (完全安定化・堅牢版)
(function(window) {
  let currentAudio = null;
  let playTimeout = null;

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

  function playZhuyinSound(text) {
    if (!text) return;

    clearActiveAudio();

    const speechMap = window.ZHUYIN_SPEECH_MAP || {};
    const speechText = speechMap[text] || text;

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

// LPお試しパレットイベント
document.addEventListener('DOMContentLoaded', () => {
  const demoGrid = document.getElementById('vowel-demo-grid');
  if (demoGrid && window.VOWELS_STEP1_DATA && window.VOWELS_STEP2_DATA) {
    const demoData = [...window.VOWELS_STEP1_DATA, ...window.VOWELS_STEP2_DATA];

    demoGrid.innerHTML = demoData.map(item => `
      <div class="demo-card" data-symbol="${item.symbol}">
        <span class="step-badge" style="font-size: 0.65rem; padding: 1px 4px; margin-bottom: 2px;">${item.typeTag.split(' ')[0]}</span>
        <div class="demo-symbol">${item.symbol}</div>
        <div class="demo-pinyin">${item.pinyin}</div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 2px;">${item.katakana}</div>
        <div class="demo-audio-icon" style="margin-top: 4px;">
          🔊
        </div>
      </div>
    `).join('');

    demoGrid.querySelectorAll('.demo-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const symbol = card.getAttribute('data-symbol');
        if (window.playZhuyinSound) {
          window.playZhuyinSound(symbol);
        }
        
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      });
    });
  }
});
