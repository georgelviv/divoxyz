import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter
} from 'react-router-dom/server';
import { routes } from './routes';

export async function render(fetchRequest: Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  );

  return { html };
}
