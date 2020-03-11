const { spawn } = require('child_process')

function getPort (data) {
  const list = []
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      Array.prototype.push.apply(list, data)
    } else {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
          list.push(data[key])
        } else if (Array.isArray(data[key])) {
          Array.prototype.push.apply(list, data[key])
        }
      })
    }
  }
  let port = 8080
  list.some(item => {
    const result = item.match(/webpack-dev-server.+?:(\d+)\//)
    if (result) {
      port = result[1]
      return true
    }
  })
  return port
}

function notifier (msg, url = null) {
  const args = ['-title', 'Webpack', '-subtitle', msg]
  if (url) {
    args.push('-open')
    args.push(url)
  }
  spawn('terminal-notifier', args, {
    stdio: 'ignore',
    detached: true,
  }).unref()
}

class WebpackNotifierPlugin {
  constructor (options) {
    this.options = options
    this.isFirstCompile = true
  }

  apply (compiler) {
    compiler.hooks.done.tap('WebpackNotifierPlugin', stats => {
      if (!this.isFirstCompile) {
        return
      }
      if (stats.hasErrors()) {
        notifier('❌ Compile has errors!')
        return
      }
      this.isFirstCompile = false
      let url = null
      if (process.env.WEBPACK_DEV_SERVER) {
        const { entry } = compiler.options
        url = `http://127.0.0.1:${getPort(entry)}`
      }
      notifier('✅ Compile finish!', url)
    })
  }
}

module.exports = WebpackNotifierPlugin
