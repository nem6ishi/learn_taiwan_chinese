import { VOWELS_STEP1_DATA, VOWELS_QUIZ_QUESTIONS } from '../data/zhuyinVowels1.js';
import { playZhuyinSound } from './main.js';

let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderVowelList();
  setupQuizListeners();

  // 音声ボイスの事前読み込み
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }
});

// 4文字（ㄚ ㄛ ㄜ ㄝ）を一括表示
function renderVowelList() {
  const container = document.getElementById('vowel-list-container');
  if (!container) return;

  container.innerHTML = VOWELS_STEP1_DATA.map(item => `
    <div class="detail-card">
      
      <!-- ヘッダーエリア -->
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

      <!-- 成り立ち ＆ 発音のコツ -->
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

      <!-- 単語の例 -->
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
                  <span class="example-zhuyin">${ex.zhuyin}</span>
                  <span class="example-pinyin">${ex.pinyin}</span>
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

  // 1. 各注音符号の「発音を聴く」ボタンの点検・確実なイベントバインド
  container.querySelectorAll('.play-symbol-sound').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const symbol = btn.getAttribute('data-symbol');
      playZhuyinSound(symbol);
    };
  });

  // 2. 単語カードタップの点検・確実なイベントバインド
  container.querySelectorAll('.play-word-sound').forEach(card => {
    card.onclick = (e) => {
      e.stopPropagation();
      const word = card.getAttribute('data-word');
      playZhuyinSound(word);
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

// クイズスタート
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
  if (currentQuizIndex >= VOWELS_QUIZ_QUESTIONS.length) {
    showQuizResult();
    return;
  }

  const q = VOWELS_QUIZ_QUESTIONS[currentQuizIndex];
  const progressText = document.getElementById('quiz-progress-text');
  const promptEl = document.getElementById('quiz-question-prompt');
  const audioTrigger = document.getElementById('quiz-audio-trigger-area');
  const optionsGrid = document.getElementById('quiz-options-grid');
  const feedbackMsg = document.getElementById('quiz-feedback-msg');

  if (progressText) progressText.innerText = `第 ${currentQuizIndex + 1} / ${VOWELS_QUIZ_QUESTIONS.length} 問`;
  if (promptEl) promptEl.innerText = q.prompt;
  if (feedbackMsg) feedbackMsg.innerText = '';

  // 3. クイズ問題の「🔊 音声を聴く（再再生）」ボタンの点検・バインド
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
        playZhuyinSound(q.targetSymbol);
      };
    }
  }

  // ユーザーアクション由来であれば音声を再生
  if (isUserAction || q.type === 'audio') {
    setTimeout(() => {
      playZhuyinSound(q.targetSymbol);
    }, 120);
  }

  // 4. 4択選択肢の点検・バインド
  optionsGrid.innerHTML = q.options.map(opt => `
    <button class="quiz-btn" data-val="${opt}">${opt}</button>
  `).join('');

  optionsGrid.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-val');
      const isCorrect = selected === q.targetSymbol;

      // 選択した注音の音を正しく再生
      playZhuyinSound(selected);

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
  if (!quizSection) return;

  quizSection.innerHTML = `
    <div style="padding: 24px 0; text-align: center;">
      <h2 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 8px;">
        🏆 クイズ結果
      </h2>
      <p style="font-size: 1.25rem; color: var(--color-primary); font-weight: 700; margin-bottom: 20px;">
        正解数: ${quizScore} / ${VOWELS_QUIZ_QUESTIONS.length} 問
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
