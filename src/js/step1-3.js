// STEP 1-3 鼻音・そり舌母音 学習＆クイズ制御 (完全音素同調版)
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
    const dataList = window.VOWELS_STEP3_DATA;
    if (!container || !dataList) return;

    container.innerHTML = dataList.map(item => `
      <div class="detail-card">
        
        <div class="detail-header">
          <div class="detail-header-left">
            <div class="detail-symbol-box">
              <span class="symbol">${item.symbol}</span>
              <span style="font-size: 0.8rem; font-weight: 700;">${item.pinyin}</span>
            </div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); margin-bottom: 2px;">
                <span style="background: var(--color-primary-light); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-right: 4px;">${item.typeTag}</span>
                ${item.title} (${item.katakana})
              </div>
              <h2 style="font-size: 1.4rem; font-weight: 900;">
                注音符号 「${item.symbol}」
              </h2>
            </div>
          </div>
          
          <button class="btn btn-primary play-symbol-sound" data-symbol="${item.symbol}">
            🔊 「${item.symbol}」を発音
          </button>
        </div>

        <div class="info-blocks-grid">
          <div class="info-block">
            <div class="info-block-title">
              🈁 漢字の成り立ち: <strong>${item.originKanji}</strong>
            </div>
            <div class="info-block-content">
              ${item.originDesc}
            </div>
          </div>

          <div class="info-block">
            <div class="info-block-title">
              💡 発音のコツ
            </div>
            <div class="info-block-content">
              <strong>${item.tipTitle}</strong><br>
              ${item.tipDesc}
            </div>
          </div>
        </div>

        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text-muted);">
            📚 身近な単語例 (タップで発音)
          </h4>
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
                  <span class="audio-icon-tag">🔊</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `).join('');

    container.querySelectorAll('.play-symbol-sound').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-symbol');
        if (window.playZhuyinSound) window.playZhuyinSound(symbol);
      };
    });

    container.querySelectorAll('.play-word-sound').forEach(card => {
      card.onclick = (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        if (window.playZhuyinSound) window.playZhuyinSound(word);
      };
    });
  }

  function setupQuizListeners() {
    const startTopBtn = document.getElementById('start-quiz-top-btn');
    const startBottomBtn = document.getElementById('start-quiz-bottom-btn');

    const runQuiz = () => {
      if (window.QuizEngine) {
        window.QuizEngine.startQuiz(window.VOWELS_QUIZ_QUESTIONS_3, {
          stepTitle: "1-3 確認クイズ",
          nextStepUrl: "index.html",
          containerId: "quiz-section"
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
