import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// www.rpow2.xyz landing page: a standard React/Vite static project.
// Served from the root domain (custom domain www.rpow2.xyz), so base stays the
// default '/'; build output goes to dist/ (including public/ favicon and the
// CNAME required for the GitHub Pages custom domain).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    target: "es2020",
  },
});
