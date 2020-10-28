import axios from 'axios'

axios.defaults.withCredentials = true
import API from "@/net/API"
import "@/mock/index"

export default {
    async loadMore(start, num) {
        return await axios.post(API.LOAD_MORE_TASK.path, {start, num})
    },
    async loadTask() {
        return await axios.get(API.LOAD_DEMANDER_TASK.path)
    },
    async createTask(cover, title, intro, deadline) {
        let formData = new FormData()
        formData.append('file', cover)
        let data = JSON.stringify({title, intro, deadline})
        formData.append('data', data)   // 上传文件的同时， 也可以上传其他数据
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        return await axios.post(API.CREATE_TASK.path, formData, config)
    },
    async configTask(problems, id, deadline, miniTasksNum, miniTasksBonus) {
        let formData = new FormData()
        formData.append('file', problems)
        let data = JSON.stringify({id, deadline, miniTasksNum, miniTasksBonus})
        formData.append('data', data)   // 上传文件的同时， 也可以上传其他数据
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        return await axios.post(API.CONFIG_TASK.path, formData, config)
    },
    async releaseTask(id) {
        return await axios.post(API.RELEASE_TASK.path, { id })
    },
    async terminateTask(id) {
        return await axios.post(API.TERMINATE_TASK.path, { id })
    },
}