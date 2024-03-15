import { onRequest } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { app as serverApp } from './prod-server.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distPath = resolve(__dirname, './dist');

export const app = onRequest((req, res) => {
  return serverApp(distPath)
    .then((app) => {
      return app(req, res);
    })
    .catch((e) => {
      log(e);
    });
});
