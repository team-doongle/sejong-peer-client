import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/font.css";
import { AuthProvider } from "./context/authContext";
import { LoadingProvider } from "./context/loadingContext";

import { worker } from "../mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

// 전체 화면 모드로 설정
if (window.navigator.hasOwnProperty("standalone")) {
  // iOS에서는 "standalone" 속성이 사용됩니다.
  document.documentElement.requestFullscreen();
} else {
  // 안드로이드에서는 "fullscreen" 속성이 사용됩니다.
  document.documentElement.requestFullscreen({ navigationUI: "hide" });
}

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
