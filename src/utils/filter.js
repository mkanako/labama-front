import Vue from 'vue'
import moment from 'moment'

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('formatTime', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!dataStr) {
    return ''
  }
  return moment(dataStr).format(pattern)
})
