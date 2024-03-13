import { app } from './server.js';

const isProduction = process.env.NODE_ENV === 'production';
// Constants

const port = process.env.PORT || 5173;

// Start http server
app(isProduction).then((app) => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
