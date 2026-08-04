// STEP 1-2 学習＆クイズ制御 (ボイスウェーブ・モダンUI完全版)
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
    const dataList = window.VOWELS_STEP2_DATA;
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
          🗣️ 【子音 / 聲母】 4文字（ㄉ ㄊ ㄋ ㄌ）
        </h3>
        <p style="font-size: 0.88rem; color: var(--color-text-muted); margin: 4px 0 0 0;">
          舌先を上の前歯の裏につけて発音する音です。
        </p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px;">
        ${consonants.map(renderCard).join('')}
      </div>

      <!-- グループ②: 母音 -->
      <div style="margin-top: 16px; margin-bottom: 12px; background: var(--color-bg-subtle); border-left: 4px solid var(--color-text-main); border-radius: var(--radius-sm); padding: 16px 20px;">
        <span class="pill-badge" style="margin-bottom: 4px;">PART 2</span>
        <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--color-text-main); margin-top: 2px;">
          🎵 【二重母音 / 複韻母】 4文字（ㄞ ㄟ ㄠ ㄡ）
        </h3>
        <p style="font-size: 0.88rem; color: var(--color-text-muted); margin: 4px 0 0 0;">
          音を滑らかにすべらせて変化させる二重母音です。
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
    const closeQuizBtn = document.getElementById('close-quiz-btn');

    if (startTopBtn) startTopBtn.onclick = () => startQuiz();
    if (startBottomBtn) startBottomBtn.onclick = () => startQuiz();

    if (closeQuizBtn) {
      closeQuizBtn.onclick = () => {
        const quizSection = document.getElementById('quiz-section');
        const listContainer = document.getElementById('vowel-list-container');
        const quizCta = document.getElementById('quiz-cta-section');

        if (quizSection) quizSection.classList.remove('active');
        if (listContainer) listContainer.style.display = 'flex';
        if (quizCta) quizCta.style.display = 'block';
      };
    }
  }

  function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;

    const quizSection = document.getElementById('quiz-section');
    const listContainer = document.getElementById('vowel-list-container');
    const quizCta = document.getElementById('quiz-cta-section');

    if (quizSection && listContainer) {
      listContainer.style.display = 'none';
      if (quizCta) quizCta.style.display = 'none';
      quizSection.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      renderQuizQuestion(true);
    }
  }

  function renderQuizQuestion(isUserAction = false) {
    const questions = window.VOWELS_QUIZ_QUESTIONS_2;
    if (!questions || currentQuizIndex >= questions.length) {
      showQuizResult();
      return;
    }

    const q = questions[currentQuizIndex];
    const progressText = document.getElementById('quiz-progress-text');
    const promptEl = document.getElementById('quiz-question-prompt');
    const audioTrigger = document.getElementById('quiz-audio-trigger-area');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedbackMsg = document.getElementById('quiz-feedback-msg');

    if (progressText) progressText.innerText = `第 ${currentQuizIndex + 1} / ${questions.length} 問`;
    if (promptEl) promptEl.innerText = q.prompt;
    if (feedbackMsg) feedbackMsg.innerText = '';

    const speechText = q.speechTarget || q.targetSymbol;

    if (audioTrigger) {
      audioTrigger.style.display = 'block';
      audioTrigger.innerHTML = `
        <button class="btn btn-primary" id="quiz-audio-play-btn" style="padding: 14px 28px; font-size: 1.1rem;">
          🔊 音声を聴く（再再生）
        </button>
      `;

      const playBtn = document.getElementById('quiz-audio-play-btn');
      if (playBtn) {
        playBtn.onclick = (e) => {
          e.preventDefault();
          if (window.playZhuyinSound) window.playZhuyinSound(speechText, playBtn);
        };
      }
    }

    if (isUserAction || q.type === 'audio') {
      setTimeout(() => {
        if (window.playZhuyinSound) window.playZhuyinSound(speechText);
      }, 120);
    }

    optionsGrid.innerHTML = q.options.map(opt => `
      <button class="quiz-btn" data-val="${opt}">${opt}</button>
    `).join('');

    optionsGrid.querySelectorAll('.quiz-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const selected = btn.getAttribute('data-val');
        const isCorrect = selected === q.targetSymbol;

        const optionSpeech = (q.optionSpeechMap && q.optionSpeechMap[selected]) || selected;
        if (window.playZhuyinSound) window.playZhuyinSound(optionSpeech, btn);

        if (isCorrect) {
          btn.classList.add('correct');
          feedbackMsg.innerText = '⭕️ 正解です！';
          feedbackMsg.style.color = '#047857';
          quizScore++;
        } else {
          btn.classList.add('incorrect');
          feedbackMsg.innerText = `❌ 不正解（正解: ${q.targetSymbol}）`;
          feedbackMsg.style.color = '#B91C1C';
        }

        optionsGrid.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);

        setTimeout(() => {
          currentQuizIndex++;
          renderQuizQuestion(true);
        }, 1200);
      };
    });
  }

  function showQuizResult() {
    const quizSection = document.getElementById('quiz-section');
    const questions = window.VOWELS_QUIZ_QUESTIONS_2;
    if (!quizSection || !questions) return;

    quizSection.innerHTML = `
      <div style="padding: 24px 0; text-align: center;">
        <h2 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 8px;">
          🏆 クイズ結果
        </h2>
        <p style="font-size: 1.25rem; color: var(--color-primary); font-weight: 700; margin-bottom: 20px;">
          正解数: ${quizScore} / ${questions.length} 問
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-outline" id="retry-quiz-btn">
            🔄 もう一度挑戦
          </button>
          <a href="index.html" class="btn btn-primary">
            🏠 トップに戻る
          </a>
        </div>
      </div>
    `;

    document.getElementById('retry-quiz-btn')?.addEventListener('click', () => {
      location.reload();
    });
  }

})();
