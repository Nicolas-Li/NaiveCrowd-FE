module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://183.172.188.86:8000',  //目标地址
        changeOrigin: true,  //支持跨域
      }
    }
  },
}
