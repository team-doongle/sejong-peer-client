import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../error";
import { fetchLogin } from "../services/api";
import { fetchRefreshAuth } from "../services/apis/auth";
import { AuthContextProps } from "../types/auth";

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const navigator = useNavigate();

  const login: AuthContextProps["login"] = async (props) => {
    try {
      await fetchLogin(props);
      setIsAuth(true);
      navigator("/select");
    } catch (err) {
      handleError(err);
    }
  };

  const logout: AuthContextProps["logout"] = () => {
    setIsAuth(false);
    navigator("/login");
  };

  const refreshAuth = async () => {
    try {
      await fetchRefreshAuth();
      setIsAuth(true);
    } catch (err) {
      handleError(err);
      navigator("/login");
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
