import axios from "axios";
import { storage } from "../../storage";
import {
  FetchGetPoolRequest,
  FetchGetPoolResponse,
  FetchGetUserResponse,
  FetchPostPoolRequest,
} from "../models/matchSchema";

export const fetchGetPool = (props: FetchGetPoolRequest) => {
  return instance.get<FetchGetPoolResponse>("pool", { params: props });
};

export const fetchPostPool = (props: FetchPostPoolRequest) => {
  return instance.post("pool", props);
};

export const fetchGetUser = () => {
  return instance.get<FetchGetUserResponse>("user");
};

export const fetchPostBreak = () => {
  return instance.post("breack");
};

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/match`,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = storage.get("ACCESS_TOKEN");
  if (token) throw new Error("no token : at match api");
  return { ...config, headers: { Authorization: `Bearer ${token}` } };
});
