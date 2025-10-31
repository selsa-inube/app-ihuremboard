import React from "react";
import ReactDOM from "react-dom/client";
import { FlagProvider } from "@inubekit/inubekit";

import App from "./App";
import { ErrorModalProvider } from "./context/ErrorModalContext/ErrorModalContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <FlagProvider>
      <ErrorModalProvider>
        <App />
      </ErrorModalProvider>
    </FlagProvider>
  </React.StrictMode>,
);
