/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Variables accessible in the vite.config.ts
  readonly BASE_URL: string;

  // Variables accessible in the vue app
  readonly VITE_APP_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
