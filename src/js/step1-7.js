// src/js/step1-7.js - STEP 1-7 専用ロジック (音声バインド ＆ トロフィー総合まとめクイズ起動)
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
    const container = document.getElementById('vowel-list-container') || document;
    
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
      if (window.QuizEngine && window.VOWELS_QUIZ_QUESTIONS_7) {
        window.QuizEngine.startQuiz(window.VOWELS_QUIZ_QUESTIONS_7, {
          stepTitle: "1-7 注音符号全37文字 ＆ 5大声調 総合まとめトロフィークイズ",
          nextStepUrl: "step-2-1.html",
          containerId: "quiz-section"
        });
      } else {
        console.warn("QuizEngine or VOWELS_QUIZ_QUESTIONS_7 not found.");
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
