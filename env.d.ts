/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_FORMKIT_TOKEN: string
    readonly VITE_IMG_URL: string

    // more env variables...
}
interface ImportMeta {
    env: Record<string, string>;
}