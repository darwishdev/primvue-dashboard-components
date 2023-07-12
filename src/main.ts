import './assets/scss/app.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimVueDashboardComponents from './PrimVueDashboardComponents'

const app = createApp(App)

app.use(PrimVueDashboardComponents, {})
    .use(router)

app.mount('#app')
