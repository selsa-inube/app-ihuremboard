import React from "react";
import ReactDOM from "react-dom/client";
import { FlagProvider } from "@inubekit/inubekit";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <FlagProvider>
      <App />
    </FlagProvider>
  </React.StrictMode>,
);
