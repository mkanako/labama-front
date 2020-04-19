const fs = require('fs-extra')
const { resolve } = require('path')
const request = require('request').defaults({
  proxy: 'http://127.0.0.1:7890',
})

request({
  url: 'https://raw.githubusercontent.com/youzan/vant/dev/src/area/demo/area.js',
}, function (error, response, body) {
  if (error) {
    console.error('error:', error)
  }
  if (body) {
    const data = eval(`(${body.replace('export default', '').replace(';', '')})`) // eslint-disable-line no-eval
    if (data.province_list) {
      delete data.province_list['900000']
      output('provinces-data.js', data.province_list)
    }
    if (data.city_list) {
      Object.keys(data.city_list).forEach(code => {
        if (code > 900000) {
          delete data.city_list[code]
        }
      })
      output('cites-data.js', data.city_list)
    }
    if (data.county_list) {
      output('areas-data.js', data.county_list)
    }
  }
})

function output (name, obj) {
  fs.outputFileSync(resolve(__dirname, name), toString(obj))
}

function toString (obj) {
  const json = JSON.stringify(obj, null, 2)
    .replace(/"/g, '\'')
    .replace(/'(\d+?)'/g, '$1')
    .replace('\'\n}', '\',\n}\n')
  return 'export default ' + json
}
