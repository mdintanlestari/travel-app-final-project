import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify"; // ✅ import ini
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  </StrictMode>
);
