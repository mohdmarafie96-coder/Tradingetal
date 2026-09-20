/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" once the Google provider is configured in Supabase. */
  readonly VITE_GOOGLE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
