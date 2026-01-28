import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import profilePlugin from './plugins/profile'
import gameConfigPlugin from './plugins/gameConfig'

const app = createApp(App)

app.use(router)
app.use(profilePlugin)
app.use(gameConfigPlugin)

app.mount('#app')
