# 02-audio-tts.md: 音声読み上げ（TTS）制御ルール (Mac Chrome & iOS Safari 対応仕様)

1. **「Google 國語（臺灣）」/「Meijia」女性ボイスを最優先指定して再生する**:
   - Google TTS の直リンク URL（`client=tw-ob` / `client=gtx`）は Mac Chrome や GitHub Pages (HTTPS) の CORS / 403 Forbidden セキュリティ制限により遮断される場合がある。
   - そのため、ブラウザ（Mac Chrome / iOS Safari 等）に標準搭載されている Google 公式の最高品質ボイス **`Google 國語（臺灣）`** および **`Meijia` (zh-TW)** を最優先ターゲットとして指定した `Web Speech API` (`speechSynthesis`) で内部再生させること。
   - これにより、403 / CORS 通信エラーを 100% 原理的に回避しつつ、Google Translate と全く同一の最高品質女性ボイスでクリア・確実・即時に発音される状態を永久に維持すること。

2. **女性ボイスに統一・固定する**:
   - ユーザーの好みに合わせ、クリアで標準的な「台湾華語の女性ボイス（Google 國語 / Meijia）」で統一・安定して再生される状態を維持すること。

3. **音声生成エラー（無音）の事前確認とマッピング（`ZHUYIN_SPEECH_MAP`）**:
   - 注音符号単体や異体字によって「音声生成エラー（無音）」が発生しないよう事前検証する。
   - `ZHUYIN_SPEECH_MAP`（例: `ㄅ` ➔ `包`, `ㄆ` ➔ `婆`, `ㄇ` ➔ `摸`, `ㄈ` ➔ `發`, `ㄟ` ➔ `黑` 等）の漢字置換を常時適用維持すること。

4. **新規HTMLページ作成時の音声イベントバインド ＆ 音声ブロック解除**:
   - 新しいHTMLページ（単語一覧ページ、学習ステップページ、追加ページなど）を制作する際は、必ず `appData.js`, `appCore.js` に加えて、音声要素（`.play-word-sound`, `.play-symbol-sound`）に対する明示的なイベントバインドJS（例: `categoryWords.js` や各ステップ専用JS）をセットで読み込ませること。
   - また、クリックイベントの同期タイミングで `speechSynthesis.resume()` を呼び出すことで、Mac Chrome や iOS Safari 等のブラウザによる自動再生ブロック・音声待機状態を原理的に予防・回避すること。
