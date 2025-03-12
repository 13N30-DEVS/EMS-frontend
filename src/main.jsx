import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext from "./context/authContext";
import { QueryProvider } from "./context/QueryContext";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <QueryProvider>
      <App />
    </QueryProvider>
  </AuthContext>
);
