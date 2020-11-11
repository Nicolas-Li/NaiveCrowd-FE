import * as  Mock from "mockjs"
import API from "@/net/API"

Mock.setup({timeout: "200-400"})

let taskList = []
for (let i = 0; i < 50; i++) {
    taskList.push({
        id: 1,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        title: "任务样例",
        intro: "介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",
        time: new Date().getTime(),
        questionNum: 10000,
        miniTaskNum: 1000,
        status: 1
    })
}
Mock.mock(API.LOAD_MORE_TASK.path,API.LOAD_MORE_TASK.method,(rqst)=>{
    let data = JSON.parse(rqst.body)
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].status = i % 6
        taskList[i].id = i + 1
    }
    return { data: taskList.slice(data.start, data.start + data.num) }
})
Mock.mock(API.LOAD_TASK.path,API.LOAD_TASK.method,(rqst)=>{
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].status = i % 6
        taskList[i].id = i + 1
    }
    return { data: taskList.slice(0, 10) }
})
Mock.mock(API.LOAD_ALL_TASK.path,API.LOAD_ALL_TASK.method,(rqst)=>{
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].status = i % 6
        taskList[i].id = i + 1
        taskList[i].title="任务样例"+String(i)
    }
    return { data: taskList.slice(0, 100) }
})
Mock.mock(API.GET_FAVOR.path,API.GET_FAVOR.method,(rqst)=>{
    return { data: [3] }
})
