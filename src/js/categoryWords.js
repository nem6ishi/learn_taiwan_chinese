// カテゴリ単語一覧ページ 音声再生制御スクリプト
(function() {
  const init = () => {
    bindAudioEvents();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.getVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
      } catch (e) {}
    }
  };

  function bindAudioEvents() {
    // .play-word-sound カードのクリックイベントバインド
    document.querySelectorAll('.play-word-sound').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        if (word && window.playZhuyinSound) {
          if ('speechSynthesis' in window) {
            try { window.speechSynthesis.resume(); } catch (err) {}
          }
          window.playZhuyinSound(word, card);
        }
      });
    });

    // .play-symbol-sound ボタンのクリックイベントバインド
    document.querySelectorAll('.play-symbol-sound').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-symbol');
        if (symbol && window.playZhuyinSound) {
          if ('speechSynthesis' in window) {
            try { window.speechSynthesis.resume(); } catch (err) {}
          }
          window.playZhuyinSound(symbol, btn);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
