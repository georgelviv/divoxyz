import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <h1>
        {error.status} {error.statusText}
      </h1>
    );
  }

  if (typeof error === 'object' && error && 'message' in error) {
    return <h1>{error.message as string}</h1>;
  }

  return <h1>{error as string}</h1>;
};

ErrorBoundary.displayName = 'ErrorBoundary';

export default ErrorBoundary;
