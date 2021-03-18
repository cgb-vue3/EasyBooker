import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from "./store";
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'

axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    
    // 对响应数据做点什么
    return config;
  })


axios.interceptors.response.use(response => {

    setTimeout(() => {
        store.commit('setLoading', false)
    }, 300)

    if (response.status === 200) {
        return response.data.data
    }
    // 对响应数据做点什么
    return response;
  })


import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')