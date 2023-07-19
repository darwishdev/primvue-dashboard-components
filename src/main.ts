
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import formKitConfig from './plugins/formkit.config'

import PrimVueDashboardComponents from './PrimVueDashboardComponents'
import DialogService from 'primevue/dialogservice';
import { useDialog } from 'primevue/usedialog';
import { useToast } from "primevue/usetoast";
import apiClient from "@/api/ApiMock"
import type { UploadHandler } from 'formkit-builder/dist/types'

const app = createApp(App)

const uploadHandler: UploadHandler = {
    fileUpload: apiClient.fileUpload,
    fileRemove: apiClient.fileRemove,
    baseImageUrl: import.meta.env.VITE_IMG_URL
}
app.use(DialogService).use(PrimVueDashboardComponents, { uploadHandler, useDialog, useToast, formKitConfig })
    .use(router)

app.mount('#app')
