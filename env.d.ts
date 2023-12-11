/// <reference types="vite/client" />
declare const __SENTRY_RELEASE__: string;

interface ImportMetaEnv {
  // Variables accessible in the vite.config.ts
  readonly BASE_URL: string;
  readonly SENTRY_AUTH_TOKEN: string;

  // Variables accessible in the vue app
  readonly VITE_APP_BACKEND_URL: string;
  readonly VITE_APP_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
