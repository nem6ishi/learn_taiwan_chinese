// src/js/zhuyin-chart.js - 注音符号一覧表 専用インタラクティブバインド
(function() {
  const init = () => {
    bindChartAudioEvents();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function bindChartAudioEvents() {
    const soundCards = document.querySelectorAll('.play-symbol-sound, .play-word-sound');
    soundCards.forEach(card => {
      card.onclick = (e) => {
        e.stopPropagation();
        const symbol = card.getAttribute('data-symbol') || card.getAttribute('data-word');
        if (symbol && window.playZhuyinSound) {
          window.playZhuyinSound(symbol, card);
        }
      };
    });
  }
})();
