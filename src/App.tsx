import Loading from "components/atoms/Loading";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RootPage from "./pages/root";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Loading />
      <Routes>
        <Route
          path="/"
          element={isAuth ? <RootPage /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="/login"
          element={!isAuth ? <LoginPage /> : <Navigate to={"/"} replace />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
