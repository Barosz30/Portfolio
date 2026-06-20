import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "::",
    port: 8082,
  },
  base: "/Portfolio/",
});
