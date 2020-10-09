// 引入ajax
import axios from 'axios'
import API from "@/net/API"
import "@/mock/index"

export default {
    async login(identity, name, password) {
        axios.post(API.LOGIN.path, {
            identity: identity,
            name: name,
            password: password
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }
}