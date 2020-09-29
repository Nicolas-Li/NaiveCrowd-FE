import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// 完整引入 Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入router
import router from './router/router'
// 引入ajax
import axios from 'axios'
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
