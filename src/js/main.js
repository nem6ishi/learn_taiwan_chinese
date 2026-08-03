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

// 現在再生中のAudioオブジェクトを保持
let currentAudio = null;

/**
 * 台湾華語（zh-TW）高音質ストリーミング再生エンジン
 * Google Translate TTS + Web Speech API ハイブリッド方式
 */
export function playZhuyinSound(text) {
  if (!text) return;

  // 再生中の音があれば停止
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // 1. Google Translate TTS URL の構築 (標準台湾華語: zh-TW)
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-TW&client=tw-ob`;

  try {
    const audio = new Audio(ttsUrl);
    currentAudio = audio;

    // 再生成功
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Google TTS streaming failed, falling back to Web Speech API:', err);
        fallbackWebSpeech(text);
      });
    }

    // エラー時のフォールバック
    audio.onerror = () => {
      console.warn('Audio element error, falling back to Web Speech API');
      fallbackWebSpeech(text);
    };

  } catch (err) {
    console.error('Audio creation error, falling back to Web Speech API:', err);
    fallbackWebSpeech(text);
  }
}

// フォールバック用 Web Speech API (ブラウザ標準)
function fallbackWebSpeech(text) {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const twVoice = voices.find(v => v.lang.includes('TW') || v.lang.includes('tw'));
      if (twVoice) utterance.voice = twVoice;

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (e) {
      console.error('Fallback Web Speech API failed:', e);
    }
  }
}
