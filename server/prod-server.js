import fs from 'node:fs/promises';
import { resolve } from 'path';
import express from 'express';
import { createFetchRequest } from './request.js';

export async function app(distPath) {
  const serverPath = resolve(distPath, './server');
  const clientPath = resolve(distPath, './client');
  const indexHtmlPath = resolve(clientPath, './index.html');
  const manifestPath = resolve(clientPath, './.vite/ssr-manifest.json');
  const entryServerPath = resolve(serverPath, 'entry-server.js');

  const templateHtml = await fs.readFile(indexHtmlPath, 'utf-8');
  const ssrManifest = await fs.readFile(manifestPath, 'utf-8');

  const app = express();

  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use('/', sirv(clientPath, { extensions: [] }));

  app.use('*', async (req, res) => {
    try {
      const template = templateHtml;
      const fetchRequest = createFetchRequest(req, res);
      const render = (await import(entryServerPath)).render;
      const rendered = await render(fetchRequest, ssrManifest);

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
