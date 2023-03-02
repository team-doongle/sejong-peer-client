import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/handleError";
import { fetchLogin, fetchLogout } from "apis/auth";
import { fetchRefreshAuth } from "apis/auth";
import { FetchLoginRequest } from "apis/auth.type";
import { storage } from "../utils/storage";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "store/global";

export type AuthContextProps = {
  isAuth: boolean;
  login: (props: FetchLoginRequest) => void;
  logout: VoidFunction;
  refreshAuth: VoidFunction;
};

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const setIsLoading = useSetRecoilState(isLoadingState);

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
