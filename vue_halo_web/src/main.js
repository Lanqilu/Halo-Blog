import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import "./axios"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './permission.js' // 路由拦截

import './assets/fontawesome-free-5.11.2-web/css/all.min.css'

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


// use
Vue.use(mavonEditor)

Vue.prototype.$axios = axios

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

