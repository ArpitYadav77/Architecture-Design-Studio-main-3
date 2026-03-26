import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hide preloader when page is fully loaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

createRoot(document.getElementById("root")!).render(<App />);
