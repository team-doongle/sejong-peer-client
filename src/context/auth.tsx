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

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const navigator = useNavigate();

  const login: AuthContextProps["login"] = async (props) => {
    try {
      // const res = await fetchLogin(props);
      // const token = res.data.accessToken;
      // if (!token) throw new Error("no token");
      // storage.set("ACCESS_TOKEN", token);
      setIsAuth(true);
      navigator("/select");
    } catch (err) {
      handleError(err);
    }
  };

  const logout: AuthContextProps["logout"] = async () => {
    try {
      await fetchLogout();
      storage.remove("ACCESS_TOKEN");
      setIsAuth(false);
      navigator("/login");
    } catch (err) {
      handleError(err);
    }
  };

  const refreshAuth = async () => {
    try {
      const res = await fetchRefreshAuth();
      const token = res.data.accessToken;
      if (!token) throw new Error("no token");
      storage.set("ACCESS_TOKEN", token);
      setIsAuth(true);
    } catch (err) {
      navigator("/login");
    }
  };

  useEffect(() => {
    refreshAuth();
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
