import React from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./contexts/LanguageContext";
import App from "./App.tsx";
import "./index.css";

// Hide initial loader when app mounts
document.body.classList.add('app-loaded');

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
