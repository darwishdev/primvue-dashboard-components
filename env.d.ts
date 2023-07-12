/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_FORMKIT_TOKEN: string
    // more env variables...
}
interface ImportMeta {
    env: Record<string, string>;
}