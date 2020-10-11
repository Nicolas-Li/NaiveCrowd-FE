import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 保存全局变量
const store = new Vuex.Store({
    state: {
        // isLogin: true
    },
    mutations: {
        // login (isLogin) {
        //     isLogin = true
        // },
    }
})

export default store