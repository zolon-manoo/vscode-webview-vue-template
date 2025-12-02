import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './style.css'

// @ts-ignore
import messages from '../src/locales'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.use(i18n)

app.mount('#app')