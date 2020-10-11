import Vue from 'vue'
import App from './App.vue'
import store from '@/vuex/store'
// 完整引入 Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import VueRouter from 'vue-router'
import router from './router/router'
// 引入vue-cookies
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
