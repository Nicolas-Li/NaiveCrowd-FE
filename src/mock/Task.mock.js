import * as  Mock from "mockjs"
import API from "@/net/API"

Mock.setup({timeout: "200-400"})

let taskList = []
for (let i = 0; i < 1000; i++) {
    taskList.push({
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        title: "任务样例",
        intro: "整合人工智能，实现自动驾驶，进阶人机交互",
        time: new Date().toLocaleString(),
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
        switch (i % 5) {
            case 0:
                taskList[i].status = "待发布"
                break
            case 1:
                taskList[i].status = "已发布"
                break
            case 2:
                taskList[i].status = "待验收"
                break
            case 3:
                taskList[i].status = "待结算"
                break
            case 4:
                taskList[i].status = "任务关闭"
                break
        }
    }
    return taskList.slice(0, 10)
})
