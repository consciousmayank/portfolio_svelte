/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKETBASE_URL: string;
  readonly VITE_MASTER_BUILDER_EMAIL: string;
  readonly VITE_MASTER_BUILDER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 