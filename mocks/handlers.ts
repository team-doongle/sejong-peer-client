import authApi from "./api/auth";
import matchApi from "./api/match";

export const handlers = [...matchApi, ...authApi];
