const { succ, err } = require('../helper')
const express = require('express')

const uuid = (() => {
  let id = 0
  return () => id++
})()

const attachment = {
  image: {
    total: 3,
    pageSize: 20,
    page: 1,
    data: (new Array(3)).fill('').map(() => {
      const id = uuid()
      const url = 'https://picsum.photos/200/200?random=' + id
      return {
        id,
        filename: id + '.jpg',
        path: url,
        url,
      }
    }),
  },
  audio: {
    total: 0,
    pageSize: 20,
    page: 1,
    data: [],
  },
  video: {
    total: 0,
    pageSize: 20,
    page: 1,
    data: [],
  },
}

module.exports = [
  {
    url: 'attachment',
    response (req) {
      if (req.query && req.query.type && attachment[req.query.type]) {
        return succ(attachment[req.query.type])
      }
      return err()
    },
  },
  {
    url: 'attachment/:id(\\d+)',
    method: 'delete',
    response (req) {
      if (req.params.id) {
        const id = parseInt(req.params.id)
        for (const type in attachment) {
          for (let i = 0; i < attachment[type].data.length; i++) {
            if (attachment[type].data[i].id === id) {
              attachment[type].data.splice(i, 1)
              attachment[type].total--
              return succ()
            }
          }
        }
      }
      return err()
    },
  },
  {
    url: 'attachment',
    method: 'post',
    middleware: express.raw({ type: 'multipart/form-data' }),
    response (req) {
      if (req.body) {
        const type = req.body.toString('utf8', 0, 200).match(/Content-Type:\s+?(.{1,6})\//)?.[1]
        if (type && attachment[type]) {
          const id = uuid()
          if (type === 'image') {
            const url = 'https://picsum.photos/200/200?random=' + id
            const image = {
              id,
              filename: id + '.jpg',
              url,
              path: url,
            }
            attachment[type].data.push(image)
          }
          attachment[type].total = attachment[type].data.length
          return succ(attachment[type].data.length > 0 ? attachment[type].data[attachment[type].data.length - 1] : {})
        }
      }
      return err()
    },
  },
]
