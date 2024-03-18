import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../dist/server')
  },
  css: {
    postcss: resolve(__dirname)
  },
  resolve: {
    alias: {
      '@features': fileURLToPath(
        new URL('../src/app/features', import.meta.url)
      ),
      '@core': fileURLToPath(new URL('../src/app/core', import.meta.url)),
      '@posts': fileURLToPath(new URL('../src/app/posts', import.meta.url))
    }
  }
});
