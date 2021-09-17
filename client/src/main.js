import { createApp } from 'vue'

import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
// import VuePapaParse from 'vue-papa-parse'
// app.use(VuePapaParse)
const app = createApp(App)
app.use(Quasar, {
    plugins: {
        Notify,
    }
}, quasarUserOptions)

app.use(router)
app.mount('#app')
