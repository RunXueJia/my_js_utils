import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'
import utils from '../../myUtils'
// Vue.prototype.$utils = utils
const app =  createApp(App)
app.provide('$utils', utils)
app.use(router)
app.mount('#app')