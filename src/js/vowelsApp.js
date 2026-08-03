import { VOWELS_STEP1_DATA, VOWELS_QUIZ_QUESTIONS } from '../data/zhuyinVowels1.js';
import { playZhuyinSound } from './main.js';

let currentIndex = 0;
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderDetailCard(currentIndex);

  // クイズ開始ボタン
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

// サイドバーレンダリング
function renderSidebar() {
  const sidebar = document.getElementById('vowel-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = VOWELS_STEP1_DATA.map((item, index) => `
    <div class="sidebar-item ${index === currentIndex ? 'active' : ''}" data-index="${index}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="sidebar-symbol">${item.symbol}</span>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">${item.title}</div>
          <div style="font-size: 0.8rem; color: #64748B;">${item.katakana}</div>
        </div>
      </div>
      <span class="sidebar-pinyin">${item.pinyin}</span>
    </div>
  `).join('');

  // イベント登録
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

  // プログレスバー更新 (1〜5文字の進捗)
  const fill = document.getElementById('progress-fill');
  if (fill) {
    const pct = ((currentIndex + 1) / VOWELS_STEP1_DATA.length) * 100;
    fill.style.width = `${pct}%`;
  }
}

// 詳細カードレンダリング
function renderDetailCard(index) {
  const cardArea = document.getElementById('detail-card-area');
  if (!cardArea) return;

  const data = VOWELS_STEP1_DATA[index];

  cardArea.innerHTML = `
    <div class="detail-header">
      <div class="detail-symbol-box" style="background: linear-gradient(135deg, ${data.themeHex}, #1E293B);">
        <span class="symbol">${data.symbol}</span>
        <span class="pinyin">${data.pinyin}</span>
      </div>
      <div>
        <div style="font-size: 0.9rem; font-weight: 800; color: ${data.themeHex}; margin-bottom: 4px;">
          ${data.title} (${data.katakana})
        </div>
        <h2 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 12px;">
          注音符号 「${data.symbol}」
        </h2>
        <button class="play-sound-btn" id="card-play-sound">
          🔊 標準発音を聴く
        </button>
      </div>
    </div>

    <!-- コツ解説 -->
    <div class="tip-box" style="border-left-color: ${data.themeHex};">
      <h4>💡 発音のコツ・ポイント</h4>
      <p style="color: #334155; font-size: 1rem; line-height: 1.6;">
        <strong>${data.tipTitle}</strong><br>
        ${data.tipDesc}
      </p>
    </div>

    <!-- 代表単語例 -->
    <div class="examples-area">
      <h4>📚 「${data.symbol}」を使った身近な単語</h4>
      <div class="examples-grid">
        ${data.examples.map(ex => `
          <div class="example-card" data-word="${ex.traditional}">
            <div class="example-trad">${ex.traditional}</div>
            <div class="example-zhuyin">${ex.zhuyin} (${ex.pinyin})</div>
            <div class="example-meaning">${ex.meaning}</div>
            <div style="margin-top: 8px; font-size: 0.8rem; color: ${data.themeHex}; font-weight: 700;">
              🔊 タップで発音
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 前へ / 次へ ナビゲーション -->
    <div style="display: flex; justify-content: space-between; margin-top: 40px; border-top: 1px solid #E2E8F0; padding-top: 24px;">
      <button class="btn btn-secondary" id="prev-vowel-btn" ${index === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
        ← 前の文字
      </button>
      <button class="btn btn-primary" id="next-vowel-btn" style="background: ${data.themeHex}; border: none;">
        ${index === VOWELS_STEP1_DATA.length - 1 ? '🎉 全5文字マスター！' : '次の文字 →'}
      </button>
    </div>
  `;

  // 発音ボタンのイベント
  const playBtn = document.getElementById('card-play-sound');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playZhuyinSound(data.symbol);
    });
  }

  // 自動で音声を1回再生
  playZhuyinSound(data.symbol);

  // 単語タップ時の音声再生
  cardArea.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', () => {
      const word = card.getAttribute('data-word');
      playZhuyinSound(word);
    });
  });

  // 前へ / 次へ ボタン
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
        // クイズモード起動
        startQuiz();
      }
    });
  }
}

// クイズモードロジック
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

  // 選択肢表示
  optionsGrid.innerHTML = q.options.map(opt => `
    <button class="quiz-btn" data-val="${opt}">${opt}</button>
  `).join('');

  optionsGrid.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-val');
      const isCorrect = selected === q.targetSymbol;

      // 音声再生
      playZhuyinSound(selected);

      if (isCorrect) {
        btn.classList.add('correct');
        feedbackMsg.innerText = '⭕️ 正解です！素晴らしい！';
        feedbackMsg.style.color = '#059669';
        quizScore++;
      } else {
        btn.classList.add('incorrect');
        feedbackMsg.innerText = `❌ 残念！正解は「${q.targetSymbol}」です`;
        feedbackMsg.style.color = '#DC2626';
      }

      // 選択不可にする
      optionsGrid.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);

      // 次の問題へ
      setTimeout(() => {
        currentQuizIndex++;
        renderQuizQuestion();
      }, 1500);
    });
  });
}

function showQuizResult() {
  const quizSection = document.getElementById('quiz-section');
  if (!quizSection) return;

  quizSection.innerHTML = `
    <div class="quiz-card" style="padding: 40px 20px;">
      <div style="font-size: 4rem; margin-bottom: 16px;">🏆</div>
      <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 12px;">
        クイズ終了！
      </h2>
      <p style="font-size: 1.3rem; color: var(--primary-teal); font-weight: 800; margin-bottom: 24px;">
        スコア: ${quizScore} / ${VOWELS_QUIZ_QUESTIONS.length} 問正解
      </p>
      <p style="color: #64748B; margin-bottom: 32px;">
        基本の母音5文字（ㄚ ㄛ ㄜ ㄝ ㄞ）の音と形をバッチリ理解できました！
      </p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-secondary" id="retry-quiz-btn">
          🔄 もう一度挑戦する
        </button>
        <a href="index.html" class="btn btn-primary">
          🏠 ホーム（LP）に戻る
        </a>
      </div>
    </div>
  `;

  document.getElementById('retry-quiz-btn')?.addEventListener('click', () => {
    location.reload();
  });
}
