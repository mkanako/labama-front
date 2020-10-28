const { succ, err } = require('../helper')

const sysInfo = {
  attachmentUrl: '/attachments/admin/',
  routeList: ['*'],
}

module.exports = [
  {
    url: 'sysInfo',
    method: 'get',
    response: (req) => {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return succ(sysInfo)
      }
      return err('unauthorized: token not found or expired', -1)
    },
  },
  {
    url: 'login',
    method: 'post',
    response: (req, res) => {
      const { username, password } = req.body
      if (!username || !password || username !== 'admin') {
        return err('username or password is incorrect')
      }
      res.setHeader('Authorization', 'Bearer token')
      return succ(sysInfo)
    },
  },
  {
    url: 'logout',
    method: 'get',
    response: succ(),
  },
  {
    url: 'changePassword',
    method: 'post',
    response: succ(),
  },
]
