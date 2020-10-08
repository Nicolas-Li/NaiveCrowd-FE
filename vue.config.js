module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://NaiveCrowdBackEnd-81X86.app.secoder.net:8000',
                ws: true,
                changeOrigin: true
            },
        },
    }
}
