module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://naivecrowdbackend-81x86.app.secoder.net:80',
                // target: 'http://183.172.187.64:8000',
                ws: true,
                changeOrigin: true
            },
        },
    }
}
