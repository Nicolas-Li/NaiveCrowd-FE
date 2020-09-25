import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 管理用户状态信息
const store = new Vuex.Store({
    state: {
        currentUser: null,
        isLogin: false
    }
})

export default store