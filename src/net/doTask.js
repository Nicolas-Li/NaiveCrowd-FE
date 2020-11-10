// 引入ajax
import axios from 'axios'

axios.defaults.withCredentials = true
import API from "@/net/API"
// import "@/mock/index"

export default {
    async distributeMiniTask() {
        return await axios.get(API.DISTRIBUTE_MINITASK.path)
    },
    async getProblems(id) {
        return await axios.post(API.GET_PROBLEMS_OF_MINITASK.path, {id})
    },
    async submitAnswer(datalist, MiniTaskID) {
        return await axios.post(API.SUBMIT_ANSWER.path, {datalist, MiniTaskID})
    },
}