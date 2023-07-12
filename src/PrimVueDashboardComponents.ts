import type { App } from "vue"
import { AppCard, AppIconBtn, AppLayout, AppLogo, AppMenu } from "./components"
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from './plugins/formkit.config'
import PrimeVue from 'primevue/config'
import i18n from './plugins/i18n'
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import FormkitBuilder from "formkit-builder"
import { useToast } from "primevue/usetoast";
// import type { i18n } from 'vue-i18n'
export default {
    install: (app: App, options: {}) => {
        app.use(plugin, defaultConfig(formKitConfig))
            .use(PrimeVue)
            .use(i18n)
            .use(DialogService)
            .use(ToastService)
            .use(FormkitBuilder, { useToast, i18n })
        app.component("AppCard", AppCard)
        app.component("AppIconBtn", AppIconBtn)
        app.component("AppLayout", AppLayout)
        app.component("AppLogo", AppLogo)
        app.component("AppMenu", AppMenu)
    }
}