import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// Ajout cu CDN de Tailwind CSS pour le développement seulement
if (import.meta.env.DEV) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
    document.head.appendChild(script)
}

app.use(router)
app.use(pinia)

app.mount('#app')
