const express = require('express')
const path = require('path')
const fg = require('fast-glob')
const chokidar = require('chokidar')

const routeStack = new Map()
let mockLastIndex

function removeMocksFile (app, path) {
  for (const file in require.cache) {
    if (file.includes(path)) {
      delete require.cache[require.resolve(file)]
      break
    }
  }
  const stack = routeStack.get(path)
  if (stack) {
    for (let i = 0; i < app._router.stack.length; i++) {
      if (app._router.stack[i] === stack[0]) {
        app._router.stack.splice(i, stack[1])
        break
      }
    }
    mockLastIndex -= stack[1]
    routeStack.delete(path)
  }
}

function addMocksFile (app, path, insertIndex = null) {
  const mocks = require(path)
  if (!Array.isArray(mocks)) {
    return
  }
  const middlewares = [express.json(), express.urlencoded({ extended: true })]
  for (const mock of mocks) {
    const method = mock.method || 'get'
    const url = `${process.env.VUE_APP_BASE_API}/${mock.url}`
    app[method](url, ...middlewares.concat(mock.middleware || []), (req, res) => {
      if (mock.response instanceof Function) {
        const resp = mock.response(req, res)
        if (resp) {
          res.json(resp)
        }
      } else {
        res.json(mock.response)
      }
    })
    if (!routeStack.has(path)) {
      routeStack.set(path, [app._router.stack[app._router.stack.length - 1]])
    }
  }
  if (routeStack.has(path)) {
    routeStack.get(path).push(mocks.length)
    if (insertIndex !== null) {
      app._router.stack.splice(insertIndex, 0, ...app._router.stack.splice(app._router.stack.length - mocks.length, mocks.length))
      mockLastIndex = insertIndex + mocks.length
    }
  }
}

module.exports = app => {
  const mocksDir = path.resolve(__dirname, './api/**/*.js')

  fg.sync(mocksDir).forEach(file => {
    addMocksFile(app, file)
  })

  mockLastIndex = app._router.stack.length

  chokidar.watch(mocksDir, {
    ignoreInitial: true,
  }).on('add', path => {
    addMocksFile(app, path, mockLastIndex)
  }).on('unlink', path => {
    removeMocksFile(app, path)
  }).on('change', path => {
    removeMocksFile(app, path)
    addMocksFile(app, path, mockLastIndex)
  })
}
