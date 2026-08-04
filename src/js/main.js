// 注音ナビ 共通音声再生コアエンジン (一貫した統一ボイス制御版)
(function(window) {
  let currentAudio = null;

  // 統一ボイスキャッシュ
  let preferredTwVoice = null;

  function getBestTaiwanVoice() {
    if (preferredTwVoice) return preferredTwVoice;

    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      // 台湾標準ボイス名（Mei-Jia, Sin-Ji, Ting-Ting 等）を最優先固定
      const namedVoice = voices.find(v => 
        (v.lang === 'zh-TW' || v.lang === 'zh_TW') &&
        (v.name.includes('Mei-Jia') || v.name.includes('Sin-Ji') || v.name.includes('Ting-Ting') || v.name.includes('Yating'))
      );
      if (namedVoice) {
        preferredTwVoice = namedVoice;
        return preferredTwVoice;
      }

      const exactTw = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh_TW');
      if (exactTw) {
        preferredTwVoice = exactTw;
        return preferredTwVoice;
      }

      const twIncludes = voices.find(v => v.lang && v.lang.toLowerCase().includes('tw'));
      if (twIncludes) {
        preferredTwVoice = twIncludes;
        return preferredTwVoice;
      }
    }
    return null;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      preferredTwVoice = null;
      getBestTaiwanVoice();
    };
  }

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

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.82;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const twVoice = getBestTaiwanVoice();
        if (twVoice) {
          utterance.voice = twVoice;
        }

        let spoken = false;
        utterance.onstart = () => { spoken = true; };

        utterance.onerror = (e) => {
          console.warn('[Audio Engine] SpeechSynthesis error:', e);
          if (!spoken) playGoogleTTS(speechText);
        };

        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 40);

        return;
      } catch (err) {
        console.warn('[Audio Engine] SpeechSynthesis failed:', err);
      }
    }

    playGoogleTTS(speechText);
  }

  function playGoogleTTS(speechText) {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(speechText)}&tl=zh-TW&client=tw-ob`;
    try {
      const audio = new Audio(ttsUrl);
      currentAudio = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          playFallbackBeep();
        });
      }
    } catch (e) {
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
