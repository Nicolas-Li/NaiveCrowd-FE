// 引入ajax
import axios from 'axios'

export default {
    async logIn() {
        axios.post('api/log/login', {
            identity: 'user',
            name: 'ljj',
            password: 'wghnb'
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}