// STEP 2-1 挨拶・自己紹介 ＆ 基本文法「是」制御スクリプト
(function() {
  const init = () => {
    renderGrammarList();
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

  function renderGrammarList() {
    const container = document.getElementById('grammar-list-container') || document.getElementById('vowel-list-container');
    const dataList = window.GRAMMAR_STEP2_1_DATA;
    if (!container || !dataList) return;

    container.innerHTML = dataList.map(item => `
      <div class="detail-card">
        <div style="margin-bottom: 16px;">
          <span class="pill-badge active" style="margin-bottom: 6px;">GRAMMAR & PHRASES</span>
          <h2 style="font-size: 1.35rem; font-weight: 900; color: var(--color-text-main);">
            ${item.grammarTitle}
          </h2>
          <div style="background: var(--color-primary-light); border-left: 4px solid var(--color-primary); padding: 8px 14px; border-radius: 4px; font-weight: 800; font-size: 0.95rem; color: var(--color-primary); margin-top: 8px;">
            基本公式: ${item.grammarFormula}
          </div>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-top: 8px; line-height: 1.5;">
            ${item.explanation}
          </p>
        </div>

        <div>
          <h4 style="font-size: 0.9rem; font-weight: 800; margin-bottom: 10px; color: var(--color-text-muted);">
            🗣️ 使える例文・表現フレーズ (タップで台湾華語音声再生)
          </h4>
          <div class="example-list">
            ${item.examples.map(ex => `
              <div class="example-row play-word-sound" data-word="${ex.traditional}">
                <div class="example-left">
                  <span class="example-trad" style="font-size: 1.25rem; font-weight: 900;">${ex.traditional}</span>
                  <div class="example-phonetics">
                    <span class="example-zhuyin">注音: ${ex.zhuyin}</span>
                    <span class="example-pinyin">ピンイン: ${ex.pinyin}</span>
                  </div>
                </div>
                <div class="example-right">
                  <span class="example-meaning" style="font-size: 0.9rem;">${ex.meaning}</span>
                  <div class="audio-icon-tag">
                    <span>🔊</span>
                    <div class="voice-wave">
                      <div class="voice-bar"></div>
                      <div class="voice-bar"></div>
                      <div class="voice-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

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
      if (window.QuizEngine) {
        window.QuizEngine.startQuiz(window.GRAMMAR_QUIZ_QUESTIONS_2_1, {
          stepTitle: "2-1 確認クイズ",
          nextStepUrl: "index.html",
          containerId: "quiz-section"
        });
      }
    };

    if (startTopBtn) startTopBtn.onclick = runQuiz;
    if (startBottomBtn) startBottomBtn.onclick = runQuiz;
  }
})();
