import { atom } from "recoil";

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const isAuthState = atom({
  key: "isAuth",
  default: false,
});
