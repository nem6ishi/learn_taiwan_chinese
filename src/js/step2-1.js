// STEP 2-1 挨拶・自己紹介 ＆ 基本文法「是」制御スクリプト
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
    const container = document.getElementById('grammar-list-container') || document;
    
    container.querySelectorAll('.play-word-sound, .play-symbol-sound').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-word') || btn.getAttribute('data-symbol');
        if (symbol && window.playZhuyinSound) {
          window.playZhuyinSound(symbol, btn);
        }
      };
    });
  }

  function setupQuizListeners() {
    const startTopBtn = document.getElementById('start-quiz-top-btn');
    const startBottomBtn = document.getElementById('start-quiz-bottom-btn');

    const runQuiz = () => {
      if (window.QuizEngine && window.GRAMMAR_QUIZ_QUESTIONS_2_1) {
        window.QuizEngine.startQuiz(window.GRAMMAR_QUIZ_QUESTIONS_2_1, {
          stepTitle: "2-1 確認クイズ (挨拶・自己紹介)",
          nextStepUrl: "index.html",
          containerId: "quiz-section"
        });
      } else {
        console.warn("QuizEngine or GRAMMAR_QUIZ_QUESTIONS_2_1 not found.");
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
