import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Proxy API calls to the backend during development so the frontend can
      // use a relative `/api` base URL (no CORS, no hardcoded host).
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
