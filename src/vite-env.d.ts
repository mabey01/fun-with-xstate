/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ALPHAVANTAGE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
