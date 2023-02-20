import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";
import LoginPage from "./pages/login";
import RootPage from "./pages/root";
import SelectPage from "./pages/select";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <RootPage />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <NoNeedAuth>
            <LoginPage />
          </NoNeedAuth>
        }
      />
      <Route
        path="/select"
        element={
          <RequireAuth>
            <SelectPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuth } = useAuth();
  return <>{isAuth ? children : <Navigate to="/login" replace />}</>;
}

function NoNeedAuth({ children }: { children: JSX.Element }) {
  const { isAuth } = useAuth();
  return <>{isAuth ? <Navigate to="/" replace /> : children}</>;
}
