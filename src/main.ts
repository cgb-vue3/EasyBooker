import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from "./store";
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'

axios.interceptors.request.use(config => {
    // if(store.state.posts.length == 0  || store.state.columns.length == 0) {
    //     store.commit('setLoading', true)
    // } 
    
    // 对响应数据做点什么
    return config;
  })


axios.interceptors.response.use( async response => {
    // const delay = new Promise((resolve) => [
    //     setTimeout(() => {
    //         resolve(true)
    //         store.commit('setLoading', false)
    //     }, 500)
    // ])
    // await delay
    // store.commit('setLoading', false)
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