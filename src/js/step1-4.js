// STEP 1-4 介音 (ㄧ ㄨ ㄩ) 学習＆クイズ制御 (Pure Static First 互換)
(function() {
  const init = () => {
    bindAudioEvents();
    setupQuizListeners();

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

  function bindAudioEvents() {
    const container = document.getElementById('vowel-list-container');
    if (!container) return;

    container.querySelectorAll('.play-symbol-sound').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-symbol') || btn.getAttribute('data-word');
        if (window.playZhuyinSound) window.playZhuyinSound(symbol, btn);
      };
    });

    container.querySelectorAll('.play-word-sound').forEach(card => {
      card.onclick = (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        if (window.playZhuyinSound) window.playZhuyinSound(word, card);
      };
    });
  }

  function setupQuizListeners() {
    const startTopBtn = document.getElementById('start-quiz-top-btn');
    const startBottomBtn = document.getElementById('start-quiz-bottom-btn');

    const runQuiz = () => {
      if (window.QuizEngine && window.VOWELS_QUIZ_QUESTIONS_4) {
        window.QuizEngine.startQuiz(window.VOWELS_QUIZ_QUESTIONS_4, {
          stepTitle: "1-4 確認クイズ",
          nextStepUrl: "index.html",
          containerId: "quiz-section"
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
