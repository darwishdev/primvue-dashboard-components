import type { App } from "vue"
import * as components from "./components"
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from './plugins/formkit.config'
import PrimeVue from 'primevue/config'
import i18n from './plugins/i18n'
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import FormkitBuilder from "formkit-builder"
import { useToast } from "primevue/usetoast";
import Button from "primevue/button"
import './assets/scss/app.scss'
import 'formkit-builder/styles'
// import { provide } from 'vue'
// import type { i18n } from 'vue-i18n'
export default {
    install: (app: App, options: { useDialog: () => { open: (content: any, options?: any) => any; } }) => {
        app.use(plugin, defaultConfig(formKitConfig))
            .use(PrimeVue)
            .use(i18n)
            .use(DialogService)
            .use(ToastService)
            .use(FormkitBuilder, { useToast, i18n })

        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key as keyof typeof components])
        });

        app.provide('useDialog', options.useDialog)

        app.component('Button', Button)

    }
}