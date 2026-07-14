import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// pengganti __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "src/pages"),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: "0.0.0.0",
    // proxy: {
    //   "/api": {
    //     target: "https://travel-journal-api-bootcamp.do.dibimbing.id",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
