import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AdminAuthProvider } from "./context/AdminAuthContext";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ThemeProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
