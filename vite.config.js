import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        step1_1: resolve(__dirname, 'step-1-1.html'),
        step1_2: resolve(__dirname, 'step-1-2.html'),
        step1_3: resolve(__dirname, 'step-1-3.html')
      }
    }
  }
});
