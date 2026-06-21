import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "::",
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://chatbot-omom.onrender.com",
        changeOrigin: true,
        // Node on Windows sometimes fails TLS verify when proxying to Render.
        secure: false,
      },
    },
  },
  base: "/Portfolio/",
});
