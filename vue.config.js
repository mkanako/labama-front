const { IgnorePlugin } = require('webpack')
const WebpackNotifierPlugin = require('./webpack-notifier-plugin')
const fs = require('fs-extra')

if (process.env.NODE_ENV === 'development' && !fs.existsSync('./src/views/Test.dev.vue')) {
  fs.copyFileSync('./public/Test.dev.vue', './src/views/Test.dev.vue')
}

const webpackConfig = {
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
      args[0][0].ignore.push('Test.dev.vue')
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
        modifyVars: {
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      ...((path, target) =>
        ({
          [path]: {
            target,
            changeOrigin: true,
            pathRewrite: { [`^${path}`]: '' },
          },
        })
      )(process.env.VUE_APP_API_BASE_URL, process.env.DEV_SERVER_URL),
    },
  },
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: [],
}

module.exports = webpackConfig
