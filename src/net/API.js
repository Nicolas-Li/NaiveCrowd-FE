const API = {
    LOGIN: {
        path: "/api/log/login",
        method: "post"
    },
    REGISTER: {
        path: "/api/log/register",
        method: "post"
    },
    GET_PERSON_INFO: {
        path: "/api/log/getmessage",
        method: "get"
    },
    CHARGE: {
        path: "/api/log/charge",
        method: "post"
    },
    LOG_DEL: {
        path: "/api/log/logout",
        method: "post"
    },

    LOAD_ALL_TASK:{
        path: "/api/task/loadall",
        method: "post"
    },
    LOAD_TASK: {
        path: "/api/task/load",
        method: "get"
    },
    GET_FAVOR:{
        path:'/api/log/getcollecttasks',
        method:"post"
    },
    FAVOR:{
        path:'/api/log/collecttask',
        method:"post"
    },
    IS_FAVOR: {
        path:'/api/log/iscollected',
        method:"post"
    },
    GET_MINITASK_BY_TASK:{
        path:'/api/task/freeminitask',
        method:"post"
    },
    CREATE_TASK: {
        path: "/api/task/createtask",
        method: "post"
    },
    GET_TEMPLATE: {
        path: "/api/task/gettemplate",
        method: "post"
    },
    CONFIG_TASK: {
        path: "/api/task/configtask",
        method: "post"
    },
    BEFORE_RELEASE_TASK: {
        path: "/api/task/beforereleasetask",
        method: "post"
    },
    RELEASE_TASK: {
        path: "/api/task/releasetask",
        method: "post"
    },
    TASK_PROGRESS: {
        path: "/api/task/taskprogress",
        method: "post"
    },
    TERMINATE_TASK: {
        path: "/api/task/terminatetask",
        method: "post"
    },
    SEE_MINI_TASKS_OF_TASK: {
        path: "/api/check/seeminitasksoftask",
        method: "post"
    },
    SEE_ANSWERS_OF_USERS: {
        path: "/api/check/seeanswersofusers",
        method: "post"
    },
    SEE_ANSWERS_OF_USER: {
        path: "/api/check/seeanswersofuser",
        method: "post"
    },
    REFUSE_ANSWERS_OF_USER: {
        path: "/api/check/refuseanswerofuser",
        method: "post"
    },
    CONTINUE_RELEASE: {
        path: "/api/check/continuerelease",
        method: "post"
    },
    AUTO_CHECK: {
        path: "/api/task/autochecktask",
        method: "post"
    },
    SETTLE_TASK: {
        path: "/api/task/settletask",
        method: "post"
    },
    EXPORT_TASK: {
        path: "/api/task/exporttask",
        method: "post"
    },
    DISTRIBUTE_MINITASK: {
        path: "/api/task/distributeminitask",
        method: "get"
    },
    GET_PROBLEMS_OF_MINITASK: {
        path: "/api/task/getproblemsofminitask",
        method: "post"
    },
    SUBMIT_ANSWER: {
        path: "/api/answer/submitanswer",
        method: "post"
    },
    TIME_OUT: {
        path: "/api/answer/timeout",
        method: "post"
    },
    GET_INFO_OF_TASK:{
        path:"/api/task/taskinfoofminitask",
        method:"post"
    }
}

export default API