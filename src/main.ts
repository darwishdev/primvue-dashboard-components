
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimVueDashboardComponents from './PrimVueDashboardComponents'
import DialogService from 'primevue/dialogservice';
import { useDialog } from 'primevue/usedialog';
const app = createApp(App)

app.use(DialogService).use(PrimVueDashboardComponents, { useDialog })
    .use(router)

app.mount('#app')
