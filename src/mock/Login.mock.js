//var Mock = require('mockjs')
import * as  Mock from "better-mock"
import API from "@/net/API"

Mock.setup({timeout: "200-400"})

let userList = Array(5).fill({
    identity: "user",
    name: "Alice",
    password: 1234,
})
Mock.mock(API.LOGIN.path,API.LOGIN.method,(rqst)=>{
    console.log(rqst)
    return userList
})