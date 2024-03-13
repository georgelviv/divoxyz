import fs from 'node:fs/promises';
import express from 'express';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

export async function app(isProduction = true) {
  // Cached production assets
  const templateHtml = isProduction
    ? // ? await fs.readFile('./dist/client/index.html', 'utf-8')
      ''
    : '';
  const ssrManifest = isProduction
    ? // ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
      undefined
    : undefined;

  // Create http server
  const app = express();
  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  // Add Vite or respective production middlewares
  let vite;
  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      configFile: resolve(__dirname, 'configs/vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'custom',
      base: resolve(__dirname, 'src')
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use('/', sirv('./dist/client', { extensions: [] }));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace('/', '');

      let template;
      let render;
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const rendered = await render(url, ssrManifest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}
