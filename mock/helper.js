function succ (data = '', msg = 'success', code = 0) {
  return {
    data,
    msg,
    code,
  }
}

function err (msg = 'error', code = 1) {
  return {
    msg,
    code,
  }
}

module.exports = {
  succ,
  err,
}
