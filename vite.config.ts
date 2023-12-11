import { fileURLToPath, URL } from "node:url";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import checker from "vite-plugin-checker";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import * as path from "path";

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

const sentryConfig = {
  authToken: env.SENTRY_AUTH_TOKEN,
  org: "fredericpinaud",
  project: "frontend",
  release: env.npm_package_version,
  include: "./dist",
};

// https://vitejs.dev/config/
export default defineConfig({
  base: env.BASE_URL,
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    sentryVitePlugin(sentryConfig),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[name]",
    }),
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
        additionalData: `@import "src/assets/scss/_variables.scss";`,
      },
    },
  },
  define: {
    __SENTRY_RELEASE__: JSON.stringify(env.npm_package_version),
  },
});
