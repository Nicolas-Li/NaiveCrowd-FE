import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 管理用户状态信息
const store = new Vuex.Store({
    state: {
        userOrDemander: -1, // -1 is none, 0 is user, 1 is demander
        currentUser: null,
        isLogin: false
    }
})

export default store