import { VOWELS_STEP1_DATA } from '../data/zhuyinVowels1.js';

document.addEventListener('DOMContentLoaded', () => {
  const demoGrid = document.getElementById('vowel-demo-grid');
  
  if (demoGrid) {
    demoGrid.innerHTML = VOWELS_STEP1_DATA.map(item => `
      <div class="demo-card" data-symbol="${item.symbol}">
        <div class="demo-symbol">${item.symbol}</div>
        <div class="demo-pinyin">${item.pinyin}</div>
        <div style="font-size: 0.85rem; color: #64748B; margin-top: 4px;">${item.katakana}</div>
        <div class="demo-audio-icon">
          🔊
        </div>
      </div>
    `).join('');

    demoGrid.querySelectorAll('.demo-card').forEach(card => {
      card.addEventListener('click', () => {
        const symbol = card.getAttribute('data-symbol');
        playZhuyinSound(symbol);
        
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      });
    });
  }
});

// Web Speech API 発音再生 (堅牢化＆フォールバック付き)
export function playZhuyinSound(text) {
  if (!text) return;

  if ('speechSynthesis' in window) {
    try {
      // 停止状態の解除
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel(); // 蓄積キューをクリア

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW'; // 台湾華語
      utterance.rate = 0.8;    // 聞き取りやすいスピード
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // 台湾ボイスの優先割り当て
      const voices = window.speechSynthesis.getVoices();
      const twVoice = voices.find(v => 
        v.lang === 'zh-TW' || 
        v.lang === 'zh_TW' || 
        v.lang.toLowerCase().includes('tw') ||
        (v.lang.startsWith('zh') && v.name.includes('Taiwan'))
      );

      if (twVoice) {
        utterance.voice = twVoice;
      }

      // エラー発生時のフォールバック音
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error, playing fallback tone:', e);
        playFallbackBeep();
      };

      // 少し遅延を入れて安定再生
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);

    } catch (err) {
      console.error('SpeechSynthesis exception:', err);
      playFallbackBeep();
    }
  } else {
    playFallbackBeep();
  }
}

// フォールバック用 Web Audio API トーン音
function playFallbackBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4ノート
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error('AudioContext error:', e);
  }
}
