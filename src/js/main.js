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

    // カードクリック時の音声再生
    demoGrid.querySelectorAll('.demo-card').forEach(card => {
      card.addEventListener('click', () => {
        const symbol = card.getAttribute('data-symbol');
        playZhuyinSound(symbol);
        
        // スケールアニメーション
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      });
    });
  }
});

// Web Speech API 発音再生
export function playZhuyinSound(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // 前の再生を停止
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW'; // 台湾標準語
    utterance.rate = 0.85; // 初心者用に少しゆっくり
    utterance.pitch = 1.0;
    
    // 台湾中国語音声の検索と割り当て
    const voices = window.speechSynthesis.getVoices();
    const twVoice = voices.find(v => v.lang === 'zh-TW' || v.lang.includes('TW'));
    if (twVoice) {
      utterance.voice = twVoice;
    }

    window.speechSynthesis.speak(utterance);
  } else {
    alert('お使いのブラウザは音声再生に対応していません。');
  }
}
