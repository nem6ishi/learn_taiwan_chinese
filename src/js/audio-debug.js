// src/js/audio-debug.js - 音声デバッグ＆リアルタイムログ出力スクリプト
(function() {
  const terminal = document.getElementById('log-terminal');

  function log(msg, level = 'info') {
    if (!terminal) return;
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = `log-line log-${level}`;
    div.textContent = `[${time}] ${msg}`;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
    console.log(`[AudioDebug] ${msg}`);
  }

  const init = () => {
    try {
      inspectEnvironment();
    } catch (e) {
      console.error('[AudioDebug] inspectEnvironment error:', e);
    }
    try {
      setupListeners();
    } catch (e) {
      console.error('[AudioDebug] setupListeners error:', e);
    }
  };

  init();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  }
  window.addEventListener('load', init);

  function inspectEnvironment() {
    const uaEl = document.getElementById('env-ua');
    const protoEl = document.getElementById('env-protocol');
    const speechEl = document.getElementById('env-webspeech');
    const voicesCountEl = document.getElementById('env-voices-count');
    const topVoiceEl = document.getElementById('top-selected-voice');
    const voiceDetailEl = document.getElementById('voice-list-detail');

    if (uaEl) uaEl.textContent = navigator.userAgent;
    if (protoEl) protoEl.textContent = window.location.protocol + ' (' + (window.location.protocol === 'https:' ? '🔒 セキュア通信' : '⚠️ 非セキュア通信') + ')';

    const hasSpeech = 'speechSynthesis' in window;
    if (speechEl) {
      speechEl.textContent = hasSpeech ? '✅ サポートあり' : '❌ 非対応';
      speechEl.className = `status-badge ${hasSpeech ? 'status-ok' : 'status-ng'}`;
    }

    if (hasSpeech) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const zhVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith('zh'));
        
        if (voicesCountEl) voicesCountEl.textContent = `${zhVoices.length} 個 (全体 ${voices.length} 個)`;

        // 1. 最優先ボイスのマッチング判定
        let targetVoice = zhVoices.find(v => (v.name || '').includes('Google 國語') || (v.name || '').includes('Google 國語（臺灣）'));
        if (!targetVoice) {
          const priorityVoiceNames = ['meijia', 'shelley', 'sandy', 'flo', 'ting-ting'];
          targetVoice = zhVoices.find(v => {
            const nameLower = (v.name || '').toLowerCase();
            return priorityVoiceNames.some(p => nameLower.includes(p));
          });
        }
        if (!targetVoice) {
          targetVoice = zhVoices.find(v => (v.lang || '').toLowerCase().includes('tw') || (v.lang || '').toLowerCase().includes('zh-tw'));
        }
        if (!targetVoice && zhVoices.length > 0) {
          targetVoice = zhVoices[0];
        }

        if (topVoiceEl) {
          if (targetVoice) {
            topVoiceEl.innerHTML = `🔊 <span style="color: #166534;">${targetVoice.name}</span> <span style="font-size: 0.85rem; color: var(--color-text-muted);">(${targetVoice.lang})</span>`;
            log(`[ENGINE INFO] サイト最優先ボイス決定: ${targetVoice.name} (${targetVoice.lang})`, 'success');
          } else {
            topVoiceEl.textContent = '中国語ボイス未検出 (自動割り当て)';
          }
        }

        if (voiceDetailEl) {
          if (zhVoices.length > 0) {
            voiceDetailEl.innerHTML = '<strong>検出された中国語・台湾ボイス一覧:</strong><br>' +
              zhVoices.map(v => `• ${v.name} (${v.lang}) ${v.default ? '[OSデフォルト]' : ''}`).join('<br>');
          } else {
            voiceDetailEl.innerHTML = '<span style="color: #F87171;">⚠️ 中国語/台湾華語ボイスが検出されませんでした。</span>';
          }
        }
      };

      updateVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }

  function setupListeners() {
    const clearBtn = document.getElementById('clear-logs-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (terminal) terminal.innerHTML = '<div class="log-line log-info">[SYSTEM] ログをクリアしました。</div>';
      };
    }

    // 1. サイトメインエンジン動作テスト (我是日本人)
    const mainBtn = document.getElementById('test-main-engine-btn');
    if (mainBtn) {
      mainBtn.onclick = () => {
        log('--- 【テスト1: メイン音声エンジン動作テスト】開始 ---', 'info');
        const text = '我是日本人';
        log(`[ENGINE REQ] フレーズ: "${text}" の再生を開始します...`, 'info');
        if (window.playZhuyinSound) {
          window.playZhuyinSound(text, mainBtn);
          log('✅ [ENGINE SUCCESS] playZhuyinSound() を正常実行しました。音が流れているかご確認ください。', 'success');
        } else {
          log('❌ [ENGINE ERROR] window.playZhuyinSound がロードされていません。', 'error');
        }
      };
    }

    // 2. 注音単体 (ㄅ ➔ 包) テスト
    const zhuyinBtn = document.getElementById('test-zhuyin-map-btn');
    if (zhuyinBtn) {
      zhuyinBtn.onclick = () => {
        log('--- 【テスト2: 注音単体 (ㄅ ➔ 包) テスト】開始 ---', 'info');
        const symbol = 'ㄅ';
        const speechMap = window.ZHUYIN_SPEECH_MAP || {};
        const speechText = speechMap[symbol] || symbol;
        log(`[ZHUYIN MAP] Symbol: "${symbol}" ➔ 発音置換漢字: "${speechText}"`, 'info');
        if (window.playZhuyinSound) {
          window.playZhuyinSound(symbol, zhuyinBtn);
          log('✅ [ENGINE SUCCESS] 注音単体音声を正常実行しました。', 'success');
        } else {
          log('❌ [ENGINE ERROR] window.playZhuyinSound が定義されていません。', 'error');
        }
      };
    }

    // 3. Web Speech API 単体テスト (謝謝)
    const webSpeechBtn = document.getElementById('test-webspeech-btn');
    if (webSpeechBtn) {
      webSpeechBtn.onclick = () => {
        log('--- 【テスト3: Web Speech API 単体発声】開始 ---', 'info');
        if (!('speechSynthesis' in window)) {
          log('❌ [WEBSPEECH ERROR] ブラウザが Web Speech API をサポートしていません。', 'error');
          return;
        }

        try {
          window.speechSynthesis.resume();
          window.speechSynthesis.cancel();

          const text = '謝謝';
          const u = new SpeechSynthesisUtterance(text);
          u.lang = 'zh-TW';
          u.rate = 0.85;

          const voices = window.speechSynthesis.getVoices();
          const zhVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith('zh'));
          let target = zhVoices.find(v => (v.name || '').includes('Google 國語') || (v.name || '').includes('Google 國語（臺灣）'));
          if (!target && zhVoices.length > 0) target = zhVoices[0];

          if (target) {
            u.voice = target;
            log(`[WEBSPEECH SUCCESS] 発声ボイス: ${target.name} (${target.lang})`, 'success');
          }

          u.onstart = () => log('[WEBSPEECH EVENT] 音声発声開始 (onstart)', 'info');
          u.onend = () => log('✅ [WEBSPEECH SUCCESS] 音声発声が正常完了しました！', 'success');
          u.onerror = (err) => log(`❌ [WEBSPEECH ERROR] 発話エラー: ${err.error}`, 'error');

          window.speechSynthesis.speak(u);
        } catch (err) {
          log(`❌ [WEBSPEECH EXCEPTION] 例外が発生しました: ${err.message}`, 'error');
        }
      };
    }

    // 4. Google TTS 外部URL直接テスト (参考)
    const googleBtn = document.getElementById('test-google-tts-btn');
    if (googleBtn) {
      googleBtn.onclick = () => {
        log('--- 【テスト4: [参考] Google TTS 外部URL直接テスト】開始 ---', 'info');
        log('⚠️ [NOTE] Google TTS の外部直リンクURLは、ChromeのCORS/403制限でブロックされる仕様です。', 'warn');
        const text = '你好';
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-TW&client=tw-ob`;
        
        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.onerror = () => {
          log('❌ [EXPECTED BLOCK] 予想通り Chrome の CORS/403 セキュリティによって外部URL直アクセスが拒否されました。', 'error');
        };
        audio.onended = () => log('✅ [TTS SUCCESS] 音声再生完了', 'success');

        audio.src = url;
        const p = audio.play();
        if (p !== undefined) {
          p.catch(err => {
            log(`❌ [EXPECTED BLOCK] audio.play() 拒否: ${err.message}`, 'error');
          });
        }
      };
    }
  }
})();
