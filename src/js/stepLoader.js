// 汎用ステップローダー: #step-config 要素からクイズ設定を読み取り初期化
// step1-1.js 〜 step2-1.js の9ファイルを統合
(function() {
  const init = () => {
    const configEl = document.getElementById('step-config');
    if (!configEl) return;

    const quizKey = configEl.getAttribute('data-quiz-key');
    const fallbackQuizKey = configEl.getAttribute('data-quiz-fallback');
    const stepTitle = configEl.getAttribute('data-step-title');
    const nextStep = configEl.getAttribute('data-next-step');

    // Voice preload
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }

    // Quiz button setup
    const startTopBtn = document.getElementById('start-quiz-top-btn');
    const startBottomBtn = document.getElementById('start-quiz-bottom-btn');

    const runQuiz = () => {
      const questions = window[quizKey] || (fallbackQuizKey ? window[fallbackQuizKey] : null);
      if (window.QuizEngine && questions) {
        window.QuizEngine.startQuiz(questions, {
          stepTitle: stepTitle,
          nextStepUrl: nextStep,
          containerId: 'quiz-section'
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
