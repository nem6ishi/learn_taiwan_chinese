import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';

// プロジェクトルートの *.html を自動検出（新ページ追加時の手動更新不要）
const htmlFiles = readdirSync('.').filter(f => f.endsWith('.html')).reduce((entries, file) => {
  const name = file.replace('.html', '').replace(/-/g, '_');
  entries[name] = resolve(__dirname, file);
  return entries;
}, {});

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: htmlFiles
    }
  }
});
