// src/js/audio-debug.js - 音声デバッグ＆診断詳細ログ出力スクリプト
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

  // 即時アタッチ ＆ DOMContentLoaded ＆ load 三重アタッチ
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
        const zhVoices = voices.filter(v => (v.lang || '').toLowerCase().includes('zh'));
        
        if (voicesCountEl) voicesCountEl.textContent = `${zhVoices.length} 個 (全体 ${voices.length} 個)`;

        if (voiceDetailEl) {
          if (zhVoices.length > 0) {
            voiceDetailEl.innerHTML = '<strong>検出された中国語・台湾ボイス:</strong><br>' +
              zhVoices.map(v => `• ${v.name} (${v.lang}) ${v.default ? '[デフォルト]' : ''}`).join('<br>');
            log(`[VOICES] 中国語ボイスを ${zhVoices.length} 個検出しました。`, 'success');
          } else {
            voiceDetailEl.innerHTML = '<span style="color: #F87171;">⚠️ 中国語/台湾華語ボイスが検出されませんでした（OSの音声ライブラリ未登録の可能性）。</span>';
            log(`[VOICES WARNING] ブラウザに中国語(zh/zh-TW)ボイスが見つかりません。`, 'warn');
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

    // 1. Google TTS 直接テスト
    const googleBtn = document.getElementById('test-google-tts-btn');
    if (googleBtn) {
      googleBtn.onclick = () => {
        log('--- 【テスト1: Google TTS 直接再生】開始 ---', 'info');
        const text = '你好';
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-TW&client=tw-ob`;
        
        log(`[TTS REQ] URL: ${url}`, 'info');
        log(`[TTS REQ] referrerpolicy: no-referrer 設定済み`, 'info');

        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';

        audio.onloadstart = () => log('[TTS EVENT] 音声データの読み込みを開始しました...', 'info');
        audio.oncanplay = () => log('[TTS EVENT] 音声データの再生準備完了 (canplay)', 'info');

        audio.onended = () => {
          log('✅ [TTS SUCCESS] Google TTS 音声の再生が正常に完了しました！', 'success');
        };

        audio.onerror = (e) => {
          log(`❌ [TTS ERROR] Google TTS の読み込みに失敗しました (audio.onerror)。`, 'error');
          log(`[TTS CAUSE] 原因の可能性: ① GitHub Pages/Chrome CORSブロック (403/Forbidden)、② ネットワーク未接続、③ ブラウザ制限`, 'warn');
        };

        audio.src = url;
        const p = audio.play();
        if (p !== undefined) {
          p.then(() => {
            log('[TTS PLAY] audio.play() プロミス成功（再生開始）', 'success');
          }).catch(err => {
            log(`❌ [TTS PLAY ERROR] audio.play() が拒否されました: ${err.name} - ${err.message}`, 'error');
            log(`[PLAY CAUSE] 原因の可能性: Chromeの自動再生 (Autoplay) 政策によるブロック`, 'warn');
          });
        }
      };
    }

    // 2. Web Speech API 単体テスト
    const webSpeechBtn = document.getElementById('test-webspeech-btn');
    if (webSpeechBtn) {
      webSpeechBtn.onclick = () => {
        log('--- 【テスト2: Web Speech API 単体発音】開始 ---', 'info');
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
          const priorityVoiceNames = ['meijia', 'google 國語（臺灣）', 'google 國語', 'shelley', 'sandy', 'flo', 'ting-ting'];
          
          let target = zhVoices.find(v => priorityVoiceNames.some(p => (v.name || '').toLowerCase().includes(p)));
          if (!target) {
            target = zhVoices.find(v => (v.lang || '').toLowerCase().includes('tw') || (v.lang || '').toLowerCase().includes('zh-tw'));
          }
          if (!target) {
            target = zhVoices[0];
          }

          if (target) {
            u.voice = target;
            log(`[WEBSPEECH] 選択されたボイス: ${target.name} (${target.lang})`, 'success');
          } else {
            log(`[WEBSPEECH] 特定ボイス未指定 (lang='zh-TW' で自動割り当て)`, 'warn');
          }

          u.onstart = () => log('[WEBSPEECH EVENT] Web Speech API 発声開始 (onstart)', 'info');
          u.onend = () => log('✅ [WEBSPEECH SUCCESS] Web Speech API 発声が正常完了しました！', 'success');
          u.onerror = (err) => log(`❌ [WEBSPEECH ERROR] 発話エラー: ${err.error}`, 'error');

          window.speechSynthesis.speak(u);
          log('[WEBSPEECH] speechSynthesis.speak() コマンドを送信しました。', 'info');
        } catch (err) {
          log(`❌ [WEBSPEECH EXCEPTION] 例外が発生しました: ${err.message}`, 'error');
        }
      };
    }

    // 3. 注音単体 (ㄅ ➔ 包) マッピングテスト
    const zhuyinBtn = document.getElementById('test-zhuyin-map-btn');
    if (zhuyinBtn) {
      zhuyinBtn.onclick = () => {
        log('--- 【テスト3: 注音単体 (ㄅ ➔ 包) 音声再生】開始 ---', 'info');
        const symbol = 'ㄅ';
        if (window.playZhuyinSound) {
          log(`[ZHUYIN MAP] Symbol: "${symbol}" ➔ 置換文字: "${(window.ZHUYIN_SPEECH_MAP || {})[symbol] || symbol}"`, 'info');
          window.playZhuyinSound(symbol, zhuyinBtn);
        } else {
          log('❌ [ENGINE ERROR] window.playZhuyinSound が定義されていません。', 'error');
        }
      };
    }

    // 4. 会話フレーズ (我是日本人) テスト
    const phraseBtn = document.getElementById('test-long-phrase-btn');
    if (phraseBtn) {
      phraseBtn.onclick = () => {
        log('--- 【テスト4: 会話フレーズ (我是日本人) 再生】開始 ---', 'info');
        const phrase = '我是日本人';
        if (window.playZhuyinSound) {
          log(`[PHRASE TEST] フレーズ: "${phrase}"`, 'info');
          window.playZhuyinSound(phrase, phraseBtn);
        } else {
          log('❌ [ENGINE ERROR] window.playZhuyinSound が定義されていません。', 'error');
        }
      };
    }
  }
})();
