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
    LOG_DEL: {
        path: "/api/log/logout",
        method: "post"
    },

    LOAD_MORE_TASK: {
        path: "/api/task/loadmore",
        method: "post"
    },
    LOAD_DEMANDER_TASK: {
        path: "/api/task/load",
        method: "get"
    },
    CREATE_TASK: {
        path: "/api/task/createtask",
        method: "post"
    },
    GET_PROGRAMS_OF_MINITASK:{
        path:"/api/task/getproblemsofminitask",
        method:"post"
    },
    SUBMIT_ANSWER:{
        path:"/api/answer/submitanswer",
        method:"post"
    }
}

export default API