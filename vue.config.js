module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://183.172.188.86:8000',
                ws: true,
                changeOrigin: true
            },
        },
    }
}
