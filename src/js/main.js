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
      card.addEventListener('click', (e) => {
        e.preventDefault();
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

// 再生中のオーディオ
let currentAudio = null;

// 注音記号単体を Google TTS / Web Speech API が正しく高音質発音するためのマッピング辞書
const ZHUYIN_SPEECH_MAP = {
  'ㄚ': '啊',   // a
  'ㄛ': '喔',   // o
  'ㄜ': '鵝',   // e (または ㄜ)
  'ㄝ': '也',   // eh
  'ㄞ': '愛',   // ai
  'ㄟ': '欸',   // ei
  'ㄠ': '襖',   // ao
  'ㄡ': '歐',   // ou
  'ㄅ': '包',   // b
  'ㄆ': '撲',   // p
  'ㄇ': '摸',   // m
  'ㄈ': '佛'    // f
};

/**
 * 台湾華語（zh-TW）音声再生メイン処理
 */
export function playZhuyinSound(text) {
  if (!text) return;

  // 再生中の既存オーディオを停止・リセット
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudio = null;
  }

  // 注音記号単体の場合は、TTSが確実に発音できる漢字テキストに変換
  const speechText = ZHUYIN_SPEECH_MAP[text] || text;

  // 1. Google Translate TTS ストリーミング試行
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
      console.warn(`[Audio Engine] TTS error for "${text}" (${speechText}), switching to fallback.`);
      doFallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn(`[Audio Engine] Playback blocked/error for "${text}":`, err);
        doFallback();
      });
    }

  } catch (err) {
    console.warn(`[Audio Engine] Exception for "${text}":`, err);
    fallbackWebSpeech(text, speechText);
  }
}

// フォールバック1: Web Speech API
function fallbackWebSpeech(originalText, speechText) {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();

      // 原文または発音テキストで発話
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
  
  // フォールバック2: Web Audio API
  playFallbackBeep();
}

// フォールバック2: Web Audio API トーン
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
