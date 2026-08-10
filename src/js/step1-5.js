// src/js/step1-5.js - STEP 1-5 専用ロジック (イベントバインド ＆ クイズ起動)
document.addEventListener('DOMContentLoaded', () => {
  console.log("STEP 1-5 (子音コンプリート: ㄍㄎㄏ / ㄗㄘㄙ / ㄓㄔㄕㄖ) 初期化中...");

  // 静的カード内の音声タップイベントのバインド
  const soundElements = document.querySelectorAll('.play-word-sound');
  soundElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = el.getAttribute('data-word');
      if (word && window.TaiwanChineseApp) {
        window.TaiwanChineseApp.speak(word);
      }
    });
  });

  // クイズエンジンの初期化
  if (window.TaiwanChineseQuizEngine && window.VOWELS_QUIZ_QUESTIONS_5) {
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

    if (topBtn) topBtn.addEventListener('click', startQuiz);
    if (bottomBtn) bottomBtn.addEventListener('click', startQuiz);
  }
});
