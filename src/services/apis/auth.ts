import axios from "axios";
import { FetchLoginRequest } from "../models/authSchema";

export const fetchLogin = (props: FetchLoginRequest) => {
  return instance.post("login", props);
};

export const fetchRefreshAuth = () => {
  return instance.get("refresh");
};

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`,
  withCredentials: true,
});
