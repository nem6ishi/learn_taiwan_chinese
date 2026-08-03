import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vowels1: resolve(__dirname, 'zhuyin-vowels-1.html')
      }
    }
  }
});
