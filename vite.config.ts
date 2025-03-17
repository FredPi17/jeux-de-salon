import { fileURLToPath, URL } from "node:url";
import checker from "vite-plugin-checker";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
  base: env.BASE_URL,
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),    
    checker({
      vueTsc: true,
      stylelint: { lintCommand: "stylelint ./src/**/*.{css,vue,scss}" },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
       // additionalData: `@import "src/assets/scss/variables.scss";`,
      },
    },
  },
  define: {
  },
});
