 import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/App.vue'
import './app/styles/index.scss'
import { router } from '@/app/providers/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
