import axios from "axios";
import {
  FetchLoginRequest,
  FetchLoginResponse,
  FetchRefresh,
} from "../models/authSchema";

export const fetchLogin = (props: FetchLoginRequest) => {
  return instance.post<FetchLoginResponse>("login", props);
};

export const fetchLogout = () => {
  return instance.post("logout");
};

export const fetchRefreshAuth = () => {
  return instance.get<FetchRefresh>("refresh");
};

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`,
  withCredentials: true,
});
