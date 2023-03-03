import Layout from "components/atoms/Layout";
import {
  isRouteErrorResponse,
  Navigate,
  useRouteError,
} from "react-router-dom";
import { path } from "./router";

export default function RootBoundary() {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Layout>
          <div>
            찾을 수 없는 페이지입니다.
            <br /> 관리자에게 문의해주세요.
          </div>
        </Layout>
      );
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
