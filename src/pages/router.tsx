import { fetchGetUser } from "apis/match";
import { createBrowserRouter, json } from "react-router-dom";
import { storage } from "utils/storage";
import LoginPage from "./login";
import RootPage from "./root";
import RootBoundary from "./RootBoundary";

export const path = {
  root: "/",
  login: "login",
};

export const router = createBrowserRouter([
  {
    path: path.root,
    element: <RootPage />,
    loader: async () => {
      if (!storage.get("ACCESS_TOKEN")) {
        throw json("", { status: 401 });
      }
      return (await fetchGetUser()).data;
    },
    errorElement: <RootBoundary />,
  },
  { path: path.login, element: <LoginPage /> },
]);
