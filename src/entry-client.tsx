import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  matchRoutes
} from 'react-router-dom';
import { routes } from './routes';

async function init() {
  const lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined
        });
      })
    );
  }

  ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
      <RouterProvider router={createBrowserRouter(routes)} />
    </React.StrictMode>
  );
}

init();
