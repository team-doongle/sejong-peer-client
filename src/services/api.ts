import axios from "axios";
import { FetchLoginRequest } from "./model";

export const fetchLogin = (props: FetchLoginRequest) => {
  return instance.post("login", props);
};

const instance = axios.create({
  baseURL: `${import.meta.env.REACT_APP_BACKEND_URL}/auth`,
});
