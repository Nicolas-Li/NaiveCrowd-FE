module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://NaiveCrowdBackEnd-81X86.app.secoder.net:8000',
                target: 'http://127.0.0.1:8000',
                ws: true,
                changeOrigin: true
            },
        },
    }
}
