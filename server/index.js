import { fileURLToPath } from 'url';
import { resolve } from 'path';
import fs from 'fs';
import https from 'https';
import { app as devApp } from './dev-server.js';
import { app as prodApp } from './prod-server.js';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distPath = resolve(__dirname, '../dist');

const privateKey = fs.readFileSync(
  resolve(__dirname, '../certs/server.key'),
  'utf8'
);
const certificate = fs.readFileSync(
  resolve(__dirname, '../certs/server.crt'),
  'utf8'
);
const certs = { key: privateKey, cert: certificate };

const app = isProduction ? prodApp : devApp;

app(distPath, certs).then((app) => {
  const httpsServer = https.createServer(certs, app);
  httpsServer.listen(port, () => {
    console.log(`Server started at https://localhost:${port}`);
  });
});
