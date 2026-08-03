import { VOWELS_STEP1_DATA, VOWELS_QUIZ_QUESTIONS } from '../data/zhuyinVowels1.js';
import { playZhuyinSound } from './main.js';

let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderVowelList();
  setupQuizListeners();
});

// 5文字を一気に一括レンダリング
function renderVowelList() {
  const container = document.getElementById('vowel-list-container');
  if (!container) return;

  container.innerHTML = VOWELS_STEP1_DATA.map(item => `
    <div class="detail-card">
      <div class="detail-header">
        <div class="detail-symbol-box">
          <span class="symbol">${item.symbol}</span>
          <span style="font-size: 0.85rem; font-weight: 700;">${item.pinyin}</span>
        </div>
        <div>
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">
            ${item.title} (${item.katakana})
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 12px;">
            注音符号 「${item.symbol}」
          </h2>
          <button class="btn btn-primary play-symbol-sound" data-symbol="${item.symbol}">
            🔊 「${item.symbol}」の発音を聴く
          </button>
        </div>
      </div>

      <!-- 発音のコツ -->
      <div class="tip-box">
        <div style="font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">💡 発音のコツ</div>
        <p style="font-size: 0.95rem; line-height: 1.6; color: #334155;">
          <strong>${item.tipTitle}</strong><br>
          ${item.tipDesc}
        </p>
      </div>

      <!-- 単語の例 -->
      <div>
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px;">単語の例 (タップで発音)</h4>
        <div class="examples-grid">
          ${item.examples.map(ex => `
            <div class="example-card play-word-sound" data-word="${ex.traditional}">
              <div class="example-trad">${ex.traditional}</div>
              <div class="example-zhuyin">${ex.zhuyin}</div>
              <div style="font-size: 0.8rem; color: #64748B;">${ex.meaning}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // 各符号の発音ボタンイベント
  container.querySelectorAll('.play-symbol-sound').forEach(btn => {
    btn.addEventListener('click', () => {
      const symbol = btn.getAttribute('data-symbol');
      playZhuyinSound(symbol);
    });
  });

  // 単語タップイベント
  container.querySelectorAll('.play-word-sound').forEach(card => {
    card.addEventListener('click', () => {
      const word = card.getAttribute('data-word');
      playZhuyinSound(word);
    });
  });
}

// クイズイベントリスナー設定
function setupQuizListeners() {
  const startTopBtn = document.getElementById('start-quiz-top-btn');
  const startBottomBtn = document.getElementById('start-quiz-bottom-btn');
  const closeQuizBtn = document.getElementById('close-quiz-btn');

  if (startTopBtn) startTopBtn.addEventListener('click', startQuiz);
  if (startBottomBtn) startBottomBtn.addEventListener('click', startQuiz);

  if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', () => {
      const quizSection = document.getElementById('quiz-section');
      const listContainer = document.getElementById('vowel-list-container');
      const quizCta = document.getElementById('quiz-cta-section');

      if (quizSection) quizSection.classList.remove('active');
      if (listContainer) listContainer.style.display = 'flex';
      if (quizCta) quizCta.style.display = 'block';
    });
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
    renderQuizQuestion();

    // クイズ位置へスムーズスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function renderQuizQuestion() {
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

  if (q.type === 'audio') {
    audioTrigger.style.display = 'block';
    playZhuyinSound(q.targetSymbol);
  } else {
    audioTrigger.style.display = 'none';
  }

  const audioPlayBtn = document.getElementById('quiz-audio-play-btn');
  if (audioPlayBtn) {
    audioPlayBtn.onclick = () => playZhuyinSound(q.targetSymbol);
  }

  optionsGrid.innerHTML = q.options.map(opt => `
    <button class="quiz-btn" data-val="${opt}">${opt}</button>
  `).join('');

  optionsGrid.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-val');
      const isCorrect = selected === q.targetSymbol;

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
        renderQuizQuestion();
      }, 1200);
    });
  });
}

function showQuizResult() {
  const quizSection = document.getElementById('quiz-section');
  if (!quizSection) return;

  quizSection.innerHTML = `
    <div style="padding: 24px 0; text-align: center;">
      <h2 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 8px;">
        クイズ結果
      </h2>
      <p style="font-size: 1.2rem; color: var(--color-primary); font-weight: 700; margin-bottom: 20px;">
        正解数: ${quizScore} / ${VOWELS_QUIZ_QUESTIONS.length} 問
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn btn-outline" id="retry-quiz-btn">
          もう一度挑戦
        </button>
        <a href="index.html" class="btn btn-primary">
          トップに戻る
        </a>
      </div>
    </div>
  `;

  document.getElementById('retry-quiz-btn')?.addEventListener('click', () => {
    location.reload();
  });
}
