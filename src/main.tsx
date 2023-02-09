import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
