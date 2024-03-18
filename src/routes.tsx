import { ErrorBoundary } from '@core/components/error-boundary';
import { Home } from '@features/home';
import { Post } from '@features/post';
import App from './app';
import { Navigate, Route, createRoutesFromElements } from 'react-router-dom';

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
    <Route
      path="/post/:postId"
      element={<Post />}
      errorElement={<ErrorBoundary />}
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Route>
);
