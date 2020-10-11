// 引入ajax
import axios from 'axios'
axios.defaults.withCredentials = true
import API from "@/net/API"

export default {
    async login(password) {
        return await axios.post(API.LOGIN.path, { password })
    },
    async register(password, email, sex) {
        return await axios.post(API.REGISTER.path, { password, email, sex })
    }
}