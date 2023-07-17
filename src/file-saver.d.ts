declare module 'file-saver' {
    export function saveAs(blob: Blob | string, distFilename?: string): void;
}
