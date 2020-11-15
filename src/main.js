import Vue from 'vue'
import App from './App.vue'
// 完整引入 Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import VueRouter from 'vue-router'
import router from './router/router'

router.afterEach(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})
// 引入vue-cookies
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookies)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
