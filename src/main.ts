import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from "./store";
import axios from 'axios'

axios.defaults.baseURL = 'http://pand.club:3000/api/'

axios.interceptors.request.use(config => {
    store.commit('setLoading', true)

    // 对响应数据做点什么
    return config;
  })


axios.interceptors.response.use( async response => {
    const delay = new Promise((resolve) => [
        setTimeout(() => {
            resolve(true)
            store.commit('setLoading', false)
        }, 0)
    ])
    await delay
    store.commit('setLoading', false)

    const message = {
      status: true,
      type: response.data.error ? 'error' : 'success',
      message: response.data.msg || response.data.error
    }
   
    store.commit('setMessage', message)

    if (response.status === 200) {
        return response.data
    }
    // 对响应数据做点什么
    return response;
  })


import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')