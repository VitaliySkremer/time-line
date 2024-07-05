import './assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import plugins from './plugins'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(createPinia())
plugins.forEach(plugin => {
  app.directive(plugin.name, plugin)
})

app.mount('#app')
