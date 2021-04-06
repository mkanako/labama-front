const { IgnorePlugin } = require('webpack')
const WebpackNotifierPlugin = require('./webpack/webpack-notifier-plugin')

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      new WebpackNotifierPlugin(),
    ],
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@root', __dirname)

    config.plugin('copy').tap(args => {
      args[0][0].ignore.push('DevTest.vue')
      return args
    })

    config.module.rule('svg')
      .uses
      .clear()
      .end()
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
      .oneOf('file')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#F5222D',
            // 'link-color': '#F5222D',
            // 'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.DEV_SERVER,
        changeOrigin: true,
        pathRewrite: { [`^${process.env.VUE_APP_BASE_API}`]: '' },
      },
    },
    before: process.env.NODE_ENV === 'development' ? require('./mock/mock-server') : null,
  },
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: [],
}
