import axios from 'axios'
axios.defaults.withCredentials = true
import API from "@/net/API"

export default {
    async getInfo() {
        return await axios.get(API.GET_PERSON_INFO.path)
    },
    async logDel(password) {
        return await axios.post(API.LOG_DEL.path, { password })
    },
    async charge(money) {
        let change = "+"
        return await axios.post(API.CHARGE.path, { money, change })
    },
}