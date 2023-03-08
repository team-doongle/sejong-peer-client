import "./styles/font.css";
import "./styles/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { router } from "pages/router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { worker } from "../mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
