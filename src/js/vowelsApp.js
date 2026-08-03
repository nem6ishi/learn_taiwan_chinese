import { VOWELS_STEP1_DATA, VOWELS_QUIZ_QUESTIONS } from '../data/zhuyinVowels1.js';
import { playZhuyinSound } from './main.js';

let currentIndex = 0;
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderDetailCard(currentIndex);

  const startQuizBtn = document.getElementById('start-quiz-btn');
  const closeQuizBtn = document.getElementById('close-quiz-btn');
  const quizSection = document.getElementById('quiz-section');
  const mainLearningView = document.getElementById('main-learning-view');

  if (startQuizBtn && quizSection) {
    startQuizBtn.addEventListener('click', () => {
      startQuiz();
    });
  }

  if (closeQuizBtn && quizSection) {
    closeQuizBtn.addEventListener('click', () => {
      quizSection.classList.remove('active');
      mainLearningView.style.display = 'grid';
    });
  }
});

function renderSidebar() {
  const sidebar = document.getElementById('vowel-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = VOWELS_STEP1_DATA.map((item, index) => `
    <div class="sidebar-item ${index === currentIndex ? 'active' : ''}" data-index="${index}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="sidebar-symbol">${item.symbol}</span>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">${item.symbol} (${item.katakana})</div>
          <div style="font-size: 0.8rem; color: #64748B;">pinyin: ${item.pinyin}</div>
        </div>
      </div>
    </div>
  `).join('');

  sidebar.querySelectorAll('.sidebar-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index'), 10);
      currentIndex = idx;
      updateActiveSidebarItem();
      renderDetailCard(currentIndex);
    });
  });
}

function updateActiveSidebarItem() {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const fill = document.getElementById('progress-fill');
  if (fill) {
    const pct = ((currentIndex + 1) / VOWELS_STEP1_DATA.length) * 100;
    fill.style.width = `${pct}%`;
  }
}

function renderDetailCard(index) {
  const cardArea = document.getElementById('detail-card-area');
  if (!cardArea) return;

  const data = VOWELS_STEP1_DATA[index];

  cardArea.innerHTML = `
    <div class="detail-header">
      <div class="detail-symbol-box">
        <span class="symbol">${data.symbol}</span>
        <span style="font-size: 0.85rem; font-weight: 700;">${data.pinyin}</span>
      </div>
      <div>
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">
          ${data.title} (${data.katakana})
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 12px;">
          注音符号 「${data.symbol}」
        </h2>
        <button class="btn btn-primary" id="card-play-sound">
          🔊 発音を再生
        </button>
      </div>
    </div>

    <!-- ポイント -->
    <div class="tip-box">
      <div style="font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">💡 発音のコツ</div>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #334155;">
        <strong>${data.tipTitle}</strong><br>
        ${data.tipDesc}
      </p>
    </div>

    <!-- 単語例 -->
    <div>
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px;">単語の例</h4>
      <div class="examples-grid">
        ${data.examples.map(ex => `
          <div class="example-card" data-word="${ex.traditional}">
            <div class="example-trad">${ex.traditional}</div>
            <div class="example-zhuyin">${ex.zhuyin}</div>
            <div style="font-size: 0.8rem; color: #64748B;">${ex.meaning}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ナビゲーション -->
    <div style="display: flex; justify-content: space-between; margin-top: 32px; border-top: 1px solid var(--color-border); padding-top: 20px;">
      <button class="btn btn-outline" id="prev-vowel-btn" ${index === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
        ← 前の文字
      </button>
      <button class="btn btn-primary" id="next-vowel-btn">
        ${index === VOWELS_STEP1_DATA.length - 1 ? 'クイズに進む' : '次の文字 →'}
      </button>
    </div>
  `;

  const playBtn = document.getElementById('card-play-sound');
  if (playBtn) {
    playBtn.addEventListener('click', () => playZhuyinSound(data.symbol));
  }

  playZhuyinSound(data.symbol);

  cardArea.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', () => {
      const word = card.getAttribute('data-word');
      playZhuyinSound(word);
    });
  });

  const prevBtn = document.getElementById('prev-vowel-btn');
  const nextBtn = document.getElementById('next-vowel-btn');

  if (prevBtn && index > 0) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateActiveSidebarItem();
      renderDetailCard(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (index < VOWELS_STEP1_DATA.length - 1) {
        currentIndex++;
        updateActiveSidebarItem();
        renderDetailCard(currentIndex);
      } else {
        startQuiz();
      }
    });
  }
}

function startQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;

  const quizSection = document.getElementById('quiz-section');
  const mainLearningView = document.getElementById('main-learning-view');

  if (quizSection && mainLearningView) {
    mainLearningView.style.display = 'none';
    quizSection.classList.add('active');
    renderQuizQuestion();
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
        feedbackMsg.innerText = '⭕️ 正解です';
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
    <div style="padding: 24px 0;">
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
