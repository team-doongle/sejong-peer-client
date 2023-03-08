import {
  isRouteErrorResponse,
  Navigate,
  useRouteError,
} from "react-router-dom";
import { path } from "../router";
import NotFoundPage from "./notFound";

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    if (error.status === 401) {
      return <Navigate to={path.login} replace />;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
