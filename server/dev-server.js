import fs from 'node:fs/promises';
import express from 'express';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createFetchRequest } from './request.js';

export async function app() {
  const { createServer } = await import('vite');
  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  const app = express();
  const vite = await createServer({
    configFile: resolve(__dirname, '..', 'configs/vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
    base: resolve(__dirname, 'src')
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const fetchRequest = createFetchRequest(req, res);

      const rawTemplate = await fs.readFile('./index.html', 'utf-8');
      const template = await vite.transformIndexHtml(url, rawTemplate);
      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

      const rendered = await render(fetchRequest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}
