// 引入ajax
import axios from 'axios'
axios.defaults.withCredentials = true
import API from "@/net/API"

export default {
    async getInfo() {
        return await axios.get(API.GET_INFO.path)
    },
    async logDel(password) {
        return await axios.post(API.LOG_DEL.path, { password })
    }
}