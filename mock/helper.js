module.exports = {
  succ (data = '', msg = 'success', code = 0) {
    return {
      data,
      msg,
      code,
    }
  },
  err (msg = 'error', code = 1) {
    return {
      msg,
      code,
    }
  },
}
