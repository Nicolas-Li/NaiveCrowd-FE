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
    CONFIG_TASK: {
        path: "/api/task/configtask",
        method: "post"
    },
    RELEASE_TASK: {
        path: "/api/task/releasetask",
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
        path: "/api/check/refuseanswersofuser",
        method: "post"
    }
}

export default API