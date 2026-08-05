// STEP 1-1 学習＆クイズ制御 (ボイスウェーブ・モダンUI完全版)
(function() {
  let currentQuizIndex = 0;
  let quizScore = 0;

  const init = () => {
    renderVowelList();
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

  function renderVowelList() {
    const container = document.getElementById('vowel-list-container');
    if (!container) return;

    // 音声バインド処理
    const bindEvents = () => {
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
    };

    // 静的HTMLが既にある場合はイベントバインドのみ
    if (container.children.length > 0) {
      bindEvents();
      return;
    }

    // バックアップ用動的生成 (万が一静的HTMLが空の場合)
    const dataList = window.VOWELS_STEP1_DATA;
    if (!dataList) return;

    const consonants = dataList.filter(item => item.typeTag.includes('子音'));
    const vowels = dataList.filter(item => item.typeTag.includes('母音'));

    const renderCard = (item) => `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-header-left">
            <div class="detail-symbol-box">
              <span class="symbol">${item.symbol}</span>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted);">${item.pinyin}</span>
            </div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
                <span class="pill-badge active">${item.typeTag}</span>
                <span style="margin-left: 6px; font-weight: 700; color: var(--color-text-muted);">${item.katakana}</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 900; letter-spacing: -0.01em;">
                ${item.title}
              </h2>
            </div>
          </div>
          <button class="btn btn-primary play-symbol-sound" data-symbol="${item.symbol}">
            <span>🔊 発音を聞く</span>
          </button>
        </div>
        <div class="example-list">
          ${item.examples.map(ex => `
            <div class="example-row play-word-sound" data-word="${ex.traditional}">
              <div class="example-left">
                <span class="example-trad">${ex.traditional}</span>
                <div class="example-phonetics">
                  <span class="example-zhuyin">注音: ${ex.zhuyin}</span>
                  <span class="example-pinyin">ピンイン: ${ex.pinyin}</span>
                </div>
              </div>
              <div class="example-right">
                <span class="example-meaning">${ex.meaning}</span>
                <div class="audio-icon-tag"><span>🔊</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = consonants.map(renderCard).join('') + vowels.map(renderCard).join('');
    bindEvents();
  }

  function setupQuizListeners() {
    const startTopBtn = document.getElementById('start-quiz-top-btn');
    const startBottomBtn = document.getElementById('start-quiz-bottom-btn');

    const runQuiz = () => {
      if (window.QuizEngine) {
        window.QuizEngine.startQuiz(window.VOWELS_QUIZ_QUESTIONS_1, {
          stepTitle: "1-1 確認クイズ",
          nextStepUrl: "step-1-2.html",
          containerId: "quiz-section"
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
