import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../error";
import { fetchLogin, fetchLogout } from "../services/apis/auth";
import { fetchRefreshAuth } from "../services/apis/auth";
import { storage } from "../storage";
import { AuthContextProps } from "../types/auth";
import { useLoading } from "./loadingContext";

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const { setIsLoading } = useLoading();

  const navigator = useNavigate();

  const login: AuthContextProps["login"] = async (props) => {
    try {
      setIsLoading(true);
      const res = await fetchLogin(props);
      const token = res.data.accessToken;
      if (!token)
        throw new Error(
          "인증에 실패했습니다.\n 세종대학교 학사포털의\n아이디와 비밀번호를 입력해주세요."
        );
      storage.set("ACCESS_TOKEN", token);
      setIsAuth(true);
      navigator("/");
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout: AuthContextProps["logout"] = async () => {
    try {
      setIsLoading(true);
      await fetchLogout();
      storage.remove("ACCESS_TOKEN");
      setIsAuth(false);
      navigator("/login");
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      const res = await fetchRefreshAuth();
      const token = res.data.accessToken;
      if (!token)
        throw new Error("인증에 실패했습니다.\n 다시 로그인 해주세요.");
      storage.set("ACCESS_TOKEN", token);
      setIsAuth(true);
    } catch (err) {
      handleError(err);
      navigator("/login");
    }
  };

  useEffect(() => {
    if (window.location.pathname !== "/login") refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
