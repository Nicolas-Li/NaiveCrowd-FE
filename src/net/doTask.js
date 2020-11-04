// 引入ajax
import axios from 'axios'
axios.defaults.withCredentials = true
import API from "@/net/API"
// import "@/mock/index"

export default {
    async load_problems(id) {
        return await axios.post(API.GET_PROBLEMS_OF_MINITASK.path, { id })
    },
    async submit_answer(datalist,MiniTaskID) {
        return await axios.post(API.SUBMIT_ANSWER.path, { datalist ,MiniTaskID})
    },
}