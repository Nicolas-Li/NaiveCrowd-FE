import axios from 'axios'

axios.defaults.withCredentials = true
import API from "@/net/API"

export default {
    async distributeMiniTask() {
        return await axios.get(API.DISTRIBUTE_TASK.path)
    },
    async getProblems(id) {
        return await axios.post(API.GET_PROBLEMS_OF_MINITASK.path, {id})
    },
    async submitAnswer(datalist, MiniTaskID) {
        return await axios.post(API.SUBMIT_ANSWER.path, {datalist, MiniTaskID})
    },
    async getInfoOfTask(id){
        return await axios.post(API.GET_INFO_OF_TASK.path, {id})
    },
    async timeOut(id){
        return await axios.post(API.TIME_OUT.path, {id})
    }
}