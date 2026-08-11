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
        step2_1: resolve(__dirname, 'step-2-1.html'),
        zhuyin_chart: resolve(__dirname, 'zhuyin-chart.html'),
        audio_debug: resolve(__dirname, 'audio-debug.html')
      }
    }
  }
});
