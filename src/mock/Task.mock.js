import * as  Mock from "mockjs"
import API from "@/net/API"

Mock.setup({timeout: "200-400"})

let taskList = []
for (let i = 0; i < 1000; i++) {
    taskList.push({
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        title: "任务样例",
        intro: "介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",
        time: new Date().getTime(),
        questionNum: 10000,
        miniTaskNum: 1000,
        status: "已发布"
    })
}
Mock.mock(API.LOAD_MORE_TASK.path,API.LOAD_MORE_TASK.method,(rqst)=>{
    let data = JSON.parse(rqst.body)
    return taskList.slice(data.start, data.start + data.num)
})
Mock.mock(API.LOAD_DEMANDER_TASK.path,API.LOAD_DEMANDER_TASK.method,(rqst)=>{
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].status = i % 6
    }
    return taskList.slice(0, 10)
})
