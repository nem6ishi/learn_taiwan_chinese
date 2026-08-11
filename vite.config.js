import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        step1_1: resolve(__dirname, 'step-1-1.html'),
        step1_2: resolve(__dirname, 'step-1-2.html'),
        step1_3: resolve(__dirname, 'step-1-3.html'),
        step1_4: resolve(__dirname, 'step-1-4.html'),
        step1_5: resolve(__dirname, 'step-1-5.html'),
        step1_6: resolve(__dirname, 'step-1-6.html'),
        step1_7: resolve(__dirname, 'step-1-7.html'),
        step1_8: resolve(__dirname, 'step-1-8.html'),
        step2_1: resolve(__dirname, 'step-2-1.html'),
        category1_words: resolve(__dirname, 'category-1-words.html'),
        category2_words: resolve(__dirname, 'category-2-words.html'),
        category3_words: resolve(__dirname, 'category-3-words.html'),
        category4_words: resolve(__dirname, 'category-4-words.html'),
        category5_words: resolve(__dirname, 'category-5-words.html'),
        zhuyin_chart: resolve(__dirname, 'zhuyin-chart.html'),
        audio_debug: resolve(__dirname, 'audio-debug.html')
      }
    }
  }
});
