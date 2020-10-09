import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 保存全局变量
const store = new Vuex.Store({
    state: {
        identity: -1, // -1 is none, 0 is user, 1 is demander
        currentUser: null,
        isLogin: false
    },
    mutations: {

    }
})

export default store