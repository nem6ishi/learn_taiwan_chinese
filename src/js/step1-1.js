// STEP 1-1 学習＆クイズ制御 (ボイスウェーブ・モダンUI完全版)
(function() {
  let currentQuizIndex = 0;
  let quizScore = 0;

  document.addEventListener('DOMContentLoaded', () => {
    renderVowelList();
    setupQuizListeners();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }
  });

  function renderVowelList() {
    const container = document.getElementById('vowel-list-container');
    const dataList = window.VOWELS_STEP1_DATA;
    if (!container || !dataList) return;

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
            <div class="voice-wave">
              <div class="voice-bar"></div>
              <div class="voice-bar"></div>
              <div class="voice-bar"></div>
            </div>
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
          <h4 style="font-size: 0.9rem; font-weight: 800; margin-bottom: 10px; color: var(--color-text-muted);">
            📚 身近な単語例 (タップで再生)
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
    `;

    container.innerHTML = `
      <!-- グループ①: 子音 -->
      <div style="margin-top: 8px; margin-bottom: 12px; background: var(--color-bg-subtle); border-left: 4px solid var(--color-primary); border-radius: var(--radius-sm); padding: 16px 20px;">
        <span class="pill-badge active" style="margin-bottom: 4px;">PART 1</span>
        <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--color-text-main); margin-top: 2px;">
          🗣️ 【子音 / 聲母】 4文字（ㄅ ㄆ ㄇ ㄈ）
        </h3>
        <p style="font-size: 0.88rem; color: var(--color-text-muted); margin: 4px 0 0 0;">
          音の頭を作る音。唇や息の使い方がポイントです。
        </p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px;">
        ${consonants.map(renderCard).join('')}
      </div>

      <!-- グループ②: 母音 -->
      <div style="margin-top: 16px; margin-bottom: 12px; background: var(--color-bg-subtle); border-left: 4px solid var(--color-text-main); border-radius: var(--radius-sm); padding: 16px 20px;">
        <span class="pill-badge" style="margin-bottom: 4px;">PART 2</span>
        <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--color-text-main); margin-top: 2px;">
          🎵 【母音 / 韻母】 4文字（ㄚ ㄛ ㄜ ㄝ）
        </h3>
        <p style="font-size: 0.88rem; color: var(--color-text-muted); margin: 4px 0 0 0;">
          音の響き（本体）を作る音。口の縦の開き方と丸みがポイントです。
        </p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${vowels.map(renderCard).join('')}
      </div>
    `;

    container.querySelectorAll('.play-symbol-sound').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const symbol = btn.getAttribute('data-symbol');
        if (window.playZhuyinSound) window.playZhuyinSound(symbol, btn);
      };
    });

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
