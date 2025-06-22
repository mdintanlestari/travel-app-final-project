import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify"; // ✅ import ini
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <>
        <App />
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </CartProvider>
  </StrictMode>
);
