import { FetchLoginRequest } from "../services/models/authSchema";

export type AuthContextProps = {
  isAuth: boolean;
  login: (props: FetchLoginRequest) => void;
  logout: VoidFunction;
  refreshAuth: VoidFunction;
};
