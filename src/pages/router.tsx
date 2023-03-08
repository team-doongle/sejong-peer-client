import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import { ErrorBoundary } from "./error/errorBoundary";
import LoginPage from "./login";
import MatePage from "./mate";
import loadUserState from "./mate/loader";
import loadCheckAuthed from "./login/loader";
import isAuthentificated from "utils/authentificate";

export const path = {
  root: "/",
  login: "/login",
  lobby: "/mate", // 임시 로비
  mate: "/mate",
};

export const router = createBrowserRouter([
  {
    path: path.root,
    loader: loadAuthentification,
    errorElement: <ErrorBoundary />,
    element: <Navigate to={path.lobby} replace />,
  },
  {
    path: path.login,
    loader: loadCheckAuthed,
    errorElement: <ErrorBoundary />,
    element: <LoginPage />,
  },
  {
    path: path.mate,
    loader: loadUserState,
    errorElement: <ErrorBoundary />,
    element: <MatePage />,
  },
]);

async function loadAuthentification() {
  if (!isAuthentificated()) {
    return redirect(path.login);
  }
  return redirect(path.lobby);
}
