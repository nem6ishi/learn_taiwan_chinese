// 汎用ステップローダー: data-* 属性からクイズ設定を読み取り初期化
// step1-1.js 〜 step2-1.js の9ファイルを統合
(function() {
  // type="module" では document.currentScript が null になるため、
  // data-quiz-key を持つ最後の script タグを検索
  const scriptTag = document.currentScript 
    || document.querySelector('script[data-quiz-key]:last-of-type')
    || (() => {
      const all = document.querySelectorAll('script[data-quiz-key]');
      return all.length > 0 ? all[all.length - 1] : null;
    })();
  if (!scriptTag) return;

  const quizKey = scriptTag.getAttribute('data-quiz-key');
  const fallbackQuizKey = scriptTag.getAttribute('data-quiz-fallback');
  const stepTitle = scriptTag.getAttribute('data-step-title');
  const nextStep = scriptTag.getAttribute('data-next-step');

  const init = () => {
    // Voice preload
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }
    setupQuizListeners();
  };

  function setupQuizListeners() {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
