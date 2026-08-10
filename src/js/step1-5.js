// src/js/step1-5.js - STEP 1-5 専用ロジック (音声バインド ＆ クイズ起動)
(function() {
  const init = () => {
    bindAudioEvents();
    setupQuizListeners();
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
    if (!window.TaiwanChineseQuizEngine || !window.VOWELS_QUIZ_QUESTIONS_5) return;

    window.TaiwanChineseQuizEngine.init({
      stepTitle: "STEP 1-5: 舌根音・歯茎音・そり舌音 確認クイズ",
      nextStepUrl: "step-2-1.html",
      containerId: "quiz-section"
    });

    const startQuiz = () => {
      window.TaiwanChineseQuizEngine.start(window.VOWELS_QUIZ_QUESTIONS_5);
    };

    const topBtn = document.getElementById('start-quiz-top-btn');
    const bottomBtn = document.getElementById('start-quiz-bottom-btn');

    if (topBtn) topBtn.onclick = startQuiz;
    if (bottomBtn) bottomBtn.onclick = startQuiz;
  }
})();
