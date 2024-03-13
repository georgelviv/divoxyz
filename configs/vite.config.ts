import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../dist/server')
  },
  css: {
    postcss: resolve(__dirname)
  }
});
