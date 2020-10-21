// 引入ajax
import axios from 'axios'
axios.defaults.withCredentials = true
import API from "@/net/API"
// import "@/mock/index"

export default {
    async getInfo() {
        return await axios.get(API.GET_PERSON_INFO.path)
    },
    async logDel(password) {
        return await axios.post(API.LOG_DEL.path, { password })
    }
}