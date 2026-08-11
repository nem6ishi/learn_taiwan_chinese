// STEP 1-1 学習＆クイズ制御 (声調マスター)
(function() {
  const init = () => {
    bindEvents();
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

  function bindEvents() {
    document.querySelectorAll('.play-symbol-sound').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-symbol');
        if (window.playZhuyinSound) window.playZhuyinSound(symbol, btn);
      };
    });

    document.querySelectorAll('.play-word-sound').forEach(card => {
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
      if (window.QuizEngine && (window.VOWELS_QUIZ_QUESTIONS_TONES || window.VOWELS_QUIZ_QUESTIONS_1)) {
        const questions = window.VOWELS_QUIZ_QUESTIONS_TONES || window.VOWELS_QUIZ_QUESTIONS_1.slice(0, 5);
        window.QuizEngine.startQuiz(questions, {
          stepTitle: "1-1 5つの声調確認クイズ",
          nextStepUrl: "step-1-2.html",
          containerId: "quiz-section"
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
