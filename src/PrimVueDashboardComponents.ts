import type { App } from "vue"
import * as components from "./components"
import PrimeVue from 'primevue/config'
import i18n from './plugins/i18n'
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import FormkitBuilder from "formkit-builder"
import type { ToastServiceMethods, UploadHandler } from 'formkit-builder/dist/types'
import type { DefaultConfigOptions } from '@formkit/vue'
import Button from "primevue/button"
import './assets/scss/app.scss'
import 'formkit-builder/styles'
export default {
    install: (app: App, options: { formKitConfig: DefaultConfigOptions, uploadHandler?: UploadHandler, useToast: () => ToastServiceMethods, useDialog: () => { open: (content: any, options?: any) => any; } }) => {
        app.use(PrimeVue)
            .use(i18n)
            .use(DialogService)
            .use(ToastService)
            .use(FormkitBuilder, { useToast: options.useToast, i18n, formKitConfig: options.formKitConfig, uploadHandler: options.uploadHandler })

        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key as keyof typeof components])
        });

        app.provide('useDialog', options.useDialog)
        app.provide('useToast', options.useToast)
        app.provide('i18n', i18n)

        app.component('Button', Button)

    }
}