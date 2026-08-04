// QuizEngine.js - リッチな確認クイズ共通エンジン (Notion風 & ゲーミフィケーション対応)
(function() {
  class QuizEngine {
    constructor() {
      this.questions = [];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.history = []; // { question, selected, isCorrect }
      this.audioCtx = null;
      this.stepTitle = "確認クイズ";
      this.nextStepUrl = "";
      this.containerId = "quiz-section";
    }

    init(options = {}) {
      if (options.stepTitle) this.stepTitle = options.stepTitle;
      if (options.nextStepUrl) this.nextStepUrl = options.nextStepUrl;
      if (options.containerId) this.containerId = options.containerId;
    }

    // Web Audio APIによる効果音生成 (外部ファイル不要)
    playSFX(type) {
      try {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.audioCtx = new AudioContext();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        if (!this.audioCtx) return;

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        if (type === 'correct') {
          // 正解音: 高く爽やかなピンポン♪
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(523.25, now); // C5
          osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
          gain1.gain.setValueAtTime(0.15, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.35);
        } else if (type === 'incorrect') {
          // 不正解音: 低めのブブー
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(220, now); // A3
          osc2.frequency.setValueAtTime(180, now + 0.12);
          gain2.gain.setValueAtTime(0.18, now);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now);
          osc2.stop(now + 0.35);
        } else if (type === 'fanfare') {
          // 完走・ファンファーレ♪
          const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + idx * 0.09;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.12, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.4);
          });
        }
      } catch (e) {
        console.warn('SFX audio Context error:', e);
      }
    }

    startQuiz(questions, options = {}) {
      this.init(options);
      this.questions = questions || [];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.history = [];

      const quizSection = document.getElementById(this.containerId);
      const listContainer = document.getElementById('vowel-list-container');
      const quizCta = document.getElementById('quiz-cta-section');

      if (quizSection) {
        if (listContainer) listContainer.style.display = 'none';
        if (quizCta) quizCta.style.display = 'none';
        quizSection.classList.add('active');

        window.scrollTo({ top: quizSection.offsetTop - 80, behavior: 'smooth' });

        this.renderQuestion(true);
      }
    }

    getTypeLabel(type) {
      switch (type) {
        case 'audio': return '🎧 音声聴き取り問題';
        case 'zhuyin-to-word': return '🈁 注音→単語判定';
        case 'word-to-zhuyin': return '📚 単語→注音表記';
        case 'fill-in-blank': return '💡 空欄穴埋め問題';
        default: return '❓ 確認クイズ';
      }
    }

    renderQuestion(isUserAction = false) {
      const quizSection = document.getElementById(this.containerId);
      if (!quizSection) return;

      if (!this.questions || this.currentIndex >= this.questions.length) {
        this.showResults();
        return;
      }

      const q = this.questions[this.currentIndex];
      const progressPercent = Math.round(((this.currentIndex) / this.questions.length) * 100);
      const speechText = q.speechTarget || q.targetSymbol;

      const streakHtml = this.streak >= 2 
        ? `<span class="quiz-streak-tag">🔥 ${this.streak} 連続正解中!</span>`
        : `<span></span>`;

      quizSection.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
          <!-- 上部ナビゲーション＆プログレス -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary);">
              第 ${this.currentIndex + 1} / ${this.questions.length} 問
            </span>
            <button class="btn btn-outline" id="close-quiz-btn" style="padding: 4px 12px; font-size: 0.8rem;">
              ✖ 学習に戻る
            </button>
          </div>

          <div class="quiz-progress-bar-wrap">
            <div class="quiz-progress-bar-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <div class="quiz-badge-bar">
            <span class="quiz-tag">${this.getTypeLabel(q.type)}</span>
            ${streakHtml}
          </div>

          <!-- 問題文カード -->
          <div class="quiz-question-box">
            <div class="quiz-question-prompt">
              ${q.prompt}
            </div>

            <div style="margin-top: 14px;">
              <button class="quiz-audio-card-btn" id="quiz-audio-play-btn">
                <span>🔊 音声を聴く（再再生）</span>
                <div class="voice-wave" id="quiz-wave-box">
                  <div class="voice-bar"></div>
                  <div class="voice-bar"></div>
                  <div class="voice-bar"></div>
                </div>
              </button>
            </div>
          </div>

          <!-- 選択肢グリッド -->
          <div class="quiz-options" id="quiz-options-grid">
            ${q.options.map(opt => `
              <button class="quiz-btn" data-val="${opt}">
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- フィードバック・解説カード -->
          <div class="quiz-explanation-card" id="quiz-exp-card"></div>
        </div>
      `;

      // イベントリスナー設定
      document.getElementById('close-quiz-btn')?.addEventListener('click', () => this.closeQuiz());

      const playBtn = document.getElementById('quiz-audio-play-btn');
      const waveBox = document.getElementById('quiz-wave-box');
      if (playBtn) {
        playBtn.onclick = (e) => {
          e.preventDefault();
          if (waveBox) waveBox.classList.add('is-playing');
          if (window.playZhuyinSound) {
            window.playZhuyinSound(speechText, playBtn);
          }
          setTimeout(() => {
            if (waveBox) waveBox.classList.remove('is-playing');
          }, 1000);
        };
      }

      // 自動音声再生
      if (isUserAction || q.type === 'audio') {
        setTimeout(() => {
          if (waveBox) waveBox.classList.add('is-playing');
          if (window.playZhuyinSound) window.playZhuyinSound(speechText);
          setTimeout(() => {
            if (waveBox) waveBox.classList.remove('is-playing');
          }, 1000);
        }, 150);
      }

      // 選択肢のクリックイベント
      const optionsGrid = document.getElementById('quiz-options-grid');
      optionsGrid.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          const selected = btn.getAttribute('data-val');
          this.handleAnswer(selected, btn, q);
        };
      });
    }

    handleAnswer(selected, btnEl, q) {
      const isCorrect = selected === q.targetSymbol;
      const optionSpeech = (q.optionSpeechMap && q.optionSpeechMap[selected]) || selected;

      // 選択された選択肢の音声再生
      if (window.playZhuyinSound) window.playZhuyinSound(optionSpeech, btnEl);

      // 記録
      this.history.push({
        question: q,
        selected: selected,
        isCorrect: isCorrect
      });

      // 全ボタンを無効化
      const optionsGrid = document.getElementById('quiz-options-grid');
      optionsGrid.querySelectorAll('.quiz-btn').forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-val') === q.targetSymbol) {
          b.classList.add('correct');
        }
      });

      const expCard = document.getElementById('quiz-exp-card');

      if (isCorrect) {
        btnEl.classList.add('correct');
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
        this.playSFX('correct');

        if (expCard) {
          expCard.className = 'quiz-explanation-card correct-exp';
          expCard.innerHTML = `
            <div style="font-weight: 800; display: flex; align-items: center; gap: 6px; font-size: 1.05rem;">
              <span>⭕️ 大正解！</span>
              ${this.streak >= 2 ? `<span style="font-size: 0.85rem; background: #10B981; color: #FFF; padding: 2px 8px; border-radius: 99px;">${this.streak} 連続正解!</span>` : ''}
            </div>
            <div style="margin-top: 4px; font-size: 0.9rem;">
              正解: <strong>${q.targetSymbol}</strong>
            </div>
          `;
        }
      } else {
        btnEl.classList.add('incorrect');
        this.streak = 0;
        this.playSFX('incorrect');

        if (expCard) {
          expCard.className = 'quiz-explanation-card incorrect-exp';
          expCard.innerHTML = `
            <div style="font-weight: 800; font-size: 1.05rem;">
              ❌ 残念！
            </div>
            <div style="margin-top: 4px; font-size: 0.9rem;">
              あなたの回答: <span style="text-decoration: line-through;">${selected}</span> <br>
              正しい正解: <strong style="color: #047857; font-size: 1.1rem;">${q.targetSymbol}</strong>
            </div>
          `;
        }
      }

      // 次の問題へスムーズに移行
      setTimeout(() => {
        this.currentIndex++;
        this.renderQuestion(true);
      }, 1600);
    }

    showResults() {
      const quizSection = document.getElementById(this.containerId);
      if (!quizSection) return;

      const total = this.questions.length;
      const ratio = total > 0 ? this.score / total : 0;
      const percent = Math.round(ratio * 100);

      this.playSFX('fanfare');

      let badgeIcon = "🏆";
      let title = "素晴らしく完璧です！";
      let stars = "⭐⭐⭐";
      let advice = "全ての文字と発音がバッチリ頭に入っています！次のステップへ進みましょう！";

      if (ratio === 1) {
        badgeIcon = "🏆";
        title = "全問正解！完璧マスター！";
        stars = "⭐⭐⭐";
      } else if (ratio >= 0.8) {
        badgeIcon = "🌟";
        title = "合格！素晴らしい出来栄え！";
        stars = "⭐⭐☆";
        advice = "もう少しで満点です！気になった発音だけ復習リストで聞き直してみましょう！";
      } else if (ratio >= 0.5) {
        badgeIcon = "📚";
        title = "グッドトライ！あともう一息！";
        stars = "⭐☆☆";
        advice = "復習リストで間違えた問題をタップして音声を聞き直し、もう一度挑戦しましょう！";
      } else {
        badgeIcon = "💪";
        title = "ファイト！何度も聴いて覚えよう！";
        stars = "☆☆☆";
        advice = "文字カード一覧に戻り、音声を聞きながらリラックスして復習してみましょう。";
      }

      quizSection.innerHTML = `
        <div class="quiz-result-container" style="max-width: 600px; margin: 0 auto;">
          <div class="quiz-score-badge">${badgeIcon}</div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--color-text-main); margin-bottom: 4px;">
            ${title}
          </h2>
          <div class="quiz-stars">${stars}</div>

          <div class="quiz-score-circle">
            <span class="quiz-score-num">${percent}%</span>
            <span class="quiz-score-label">${this.score} / ${total} 問正解</span>
          </div>

          <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            ${advice}
          </p>

          <!-- アクションボタン -->
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px;">
            <button class="btn btn-outline" id="quiz-retry-btn" style="padding: 12px 24px;">
              🔄 もう一度クイズを受ける
            </button>
            ${this.nextStepUrl ? `
              <a href="${this.nextStepUrl}" class="btn btn-primary" style="padding: 12px 24px;">
                🚀 次のステップへ進む →
              </a>
            ` : ''}
            <a href="index.html" class="btn btn-outline" style="padding: 12px 20px;">
              🏠 一覧へ戻る
            </a>
          </div>

          <!-- 全問振り返りアコーディオン / 一覧 -->
          <div class="quiz-review-section">
            <div class="quiz-review-title">
              <span>📚 全問題の復習と音声プレイバック</span>
            </div>
            <div class="quiz-review-list">
              ${this.history.map((item, idx) => {
                const targetSpeech = item.question.speechTarget || item.question.targetSymbol;
                return `
                  <div class="quiz-review-item ${item.isCorrect ? 'is-correct' : 'is-incorrect'}">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-weight: 800; color: ${item.isCorrect ? '#10B981' : '#EF4444'};">
                        ${item.isCorrect ? '⭕️' : '❌'} Q${idx + 1}
                      </span>
                      <span style="color: var(--color-text-main); font-weight: 700;">
                        正解: ${item.question.targetSymbol}
                      </span>
                      ${!item.isCorrect ? `<span style="font-size: 0.8rem; color: var(--color-text-muted);">(回答: ${item.selected})</span>` : ''}
                    </div>

                    <button class="btn btn-outline review-audio-btn" data-speech="${targetSpeech}" style="padding: 4px 10px; font-size: 0.8rem;">
                      🔊 発音を聴く
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      `;

      document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
        this.startQuiz(this.questions, {
          stepTitle: this.stepTitle,
          nextStepUrl: this.nextStepUrl,
          containerId: this.containerId
        });
      });

      // 振り返りリストの音声再生
      quizSection.querySelectorAll('.review-audio-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          const speech = btn.getAttribute('data-speech');
          if (window.playZhuyinSound) window.playZhuyinSound(speech, btn);
        };
      });
    }

    closeQuiz() {
      const quizSection = document.getElementById(this.containerId);
      const listContainer = document.getElementById('vowel-list-container');
      const quizCta = document.getElementById('quiz-cta-section');

      if (quizSection) quizSection.classList.remove('active');
      if (listContainer) listContainer.style.display = 'flex';
      if (quizCta) quizCta.style.display = 'block';
    }
  }

  window.QuizEngine = new QuizEngine();
})();
