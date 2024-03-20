import { ErrorBoundary } from '@core/components/error-boundary';
import App from './app';
import { Route, createRoutesFromElements } from 'react-router-dom';
import posts from '@posts/posts.json';
import { Post } from '@core/models/core.models';
import { NotFound } from '@core/components/not-found';

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route
      path="/"
      errorElement={<ErrorBoundary />}
      lazy={() => import('@features/home')}
    />
    <Route path="/post">
      {posts.map((post: Post) => {
        // `@posts/${post.id}` not supported by Vite
        return (
          <Route
            key={post.id}
            path={post.id}
            errorElement={<ErrorBoundary />}
            lazy={() => import(`./app/posts/${post.id}/index.ts`)}
          />
        );
      })}
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
);
