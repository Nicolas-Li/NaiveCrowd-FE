module.exports = {
    devServer: {
        proxy: {
            '/api': {
                 // target: 'http://naivecrowdbackend-81x86.app.secoder.net:80',
                target: 'http://localhost:8000',
                // target: 'http://183.172.188.97:8001',
                ws: true,
                changeOrigin: true
            },
        },
    }
}
