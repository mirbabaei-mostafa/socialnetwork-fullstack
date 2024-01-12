import React from "react";
import "./index.css";
import "./utils/i18n.ts";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
