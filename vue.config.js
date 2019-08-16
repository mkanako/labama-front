const webpack = require('webpack')

const webpackConfig = {
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('component')
      .resourceQuery(/component/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('datauri')
      .resourceQuery(/datauri/)
      .use('inline-svgo-loader')
      .loader('inline-svgo-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    stats: 'verbose',
    proxy: {
      [process.env.VUE_APP_API_BASE_URL]: {
        target: process.env.DEV_SERVER_URL,
        changeOrigin: true,
        pathRewrite: { [`^${process.env.VUE_APP_API_BASE_URL}`]: '' },
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: []
}

if (process.env.NODE_ENV === 'development') {
  webpackConfig.configureWebpack.plugins.push(require('./ThemeColorReplacerPlugin')())
}

module.exports = webpackConfig
