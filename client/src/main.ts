import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/fontawesome-free-6.3.0-web/fontawesome-free-6.3.0-web/css/fontawesome.min.css'
import './assets/fontawesome-free-6.3.0-web/fontawesome-free-6.3.0-web/css/all.min.css'
import './assets/css/main.css'


createApp(App).use(store).use(router).mount('#app')
