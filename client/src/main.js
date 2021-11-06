import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import { sync } from "vuex-router-sync"
import router from "./routes/index"
import store from "./store"

// import "./axios"

const app = createApp(App)
sync(store, router)
app.use(router)
app.use(store)
app.mount('#app')

