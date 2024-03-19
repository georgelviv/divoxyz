import { ErrorBoundary } from '@core/components/error-boundary';
import App from './app';
import { Navigate, Route, createRoutesFromElements } from 'react-router-dom';

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route
      path="/"
      errorElement={<ErrorBoundary />}
      lazy={() => import('@features/home')}
    />
    <Route
      path="/post/:postId"
      errorElement={<ErrorBoundary />}
      lazy={() => import('@features/post')}
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Route>
);
