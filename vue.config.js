process.env.VUE_CLI_TEST = false

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('wasm')
      .test(new RegExp('\.wasm'))
      .use('wasm-loader')
        .loader('wasm-loader')
        .end()
  }
}
