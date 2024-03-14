import { app as devApp } from './dev-server.js';
import { app as prodApp } from './prod-server.js';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

const app = isProduction ? prodApp : devApp;

app().then((app) => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
