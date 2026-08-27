# 01-general.md: 基本原則 ＆ 開発プロセスルール

1. **基本言語**: 基本的に日本語で対応する。
2. **Python環境**: Pythonの環境は `uv` を使用する。
3. **適切な Git Commit & Push**: 変更完了時に Git コミットおよび Push を自動で行う。
4. **全自動・自律進行ルール（確認不要）**:
   - 実装計画の作成時や機能開発時、ユーザーへ逐次確認（Proceed待ち）を行わず、コードの作成・修正・動作検証・Gitコミットまで一気に全自動で自律実行すること。
5. **バックグラウンドタスク・プロセスの厳格管理と重複防止**:
   - 開発サーバー、監視プロセス、タイマー等の非同期・バックグラウンドタスクを新たに起動・実行する際は、事前に実行中の同種タスクの有無を `manage_task` で確認し、不要な重複タスクやリソースの無駄な残留を防ぐために既存タスクを適切に停止 (`kill`) または整理した上で起動すること。
6. **ホスティング ＆ デプロイ環境（Vercel不使用・GitHub Pages運用）**:
   - **本プロジェクトでは Vercel は一切使用しない**（Vercel 関連の設定・言及は不要）。
   - デプロイ・Web公開は **GitHub Pages（GitHub Actions `.github/workflows/deploy.yml`）** にて自動運用される。
   - コードの更新時は `git push origin main` を行うことで、GitHub Actions により自動的にビルド ＆ GitHub Pages へデプロイされる。

7. **純粋な静的ページ（Static HTML/CSS/JS）完結方針**:
   - 本プロジェクトはすべて純粋な静的HTML・CSS・JavaScript（Vanilla JS）で完結するように設計すること。
   - バックエンドサーバーや動的DB処理などの複雑な仕組みは一切持ち込まず、ブラウザでHTMLを直接開くだけで100%完全動作するシンプルな静的構成を維持すること。
8. **Viteビルドにおける HTML `<script>` タグの `data-*` 属性付与禁止 ＆ DOM要素経由パラメータ渡しルール**:
   - HTML ページから JavaScript へパラメータ（クイズキー、タイトル、遷移先URL等）を渡す際、`<script>` タグ自体に `data-*` 属性を付与してはならない（Vite ビルド時に `<script>` タグの属性が自動削除・改変されるため）。
   - 必ず `<div id="step-config" style="display:none" data-quiz-key="..." data-step-title="..." ...></div>` のような非表示 DOM 要素を配置し、JavaScript 側は `document.getElementById('step-config')` 経由で属性値を取得・初期化する設計を徹底すること。
