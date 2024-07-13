import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCommonjs from '@rollup/plugin-commonjs';
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs(), visualizer()],
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "c8", // or 'istanbul'
      reporter: ["text", "json", "html"], // reporters you want to use
      reportsDirectory: "./coverage", // directory where coverage reports will be stored
    },
  },
});
