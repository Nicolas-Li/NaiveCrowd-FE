export default {
    async logIn() {
        this.axios.post('/log/login', {
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