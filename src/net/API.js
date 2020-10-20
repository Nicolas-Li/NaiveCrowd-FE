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
    }
}

export default API