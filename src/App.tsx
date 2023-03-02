import Loading from "components/atoms/Loading";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthState } from "store/global";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RootPage from "./pages/root";

function App() {
  const isAuth = useRecoilValue(isAuthState);

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
