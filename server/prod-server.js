import fs from 'node:fs/promises';
import express from 'express';

export async function app() {
  const templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
  const ssrManifest = await fs.readFile(
    './dist/client/.vite/ssr-manifest.json',
    'utf-8'
  );

  // Create http server
  const app = express();

  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use('/', sirv('./dist/client', { extensions: [] }));

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace('/', '');

      let template;
      let render;
      template = templateHtml;
      render = (await import('../dist/server/entry-server.js')).render;

      const rendered = await render(url, ssrManifest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}
