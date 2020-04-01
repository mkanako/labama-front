import Vue from 'vue'
import Uploader from './Uploader'
import AppConfigProvider from '@/AppConfigProvider'

const instances = {}

const getInstance = type => {
  if (!instances[type]) {
    instances[type] = new Vue({
      el: document.createElement('div'),
      render: h => <AppConfigProvider><Uploader ref="uploader"/></AppConfigProvider>
    })
    document.body.appendChild(instances[type].$el)
  }
  return instances[type].$refs.uploader
}

export default function (callback, option = {}) {
  option = Object.assign({
    multiple: false,
    type: 'image',
  }, option)
  getInstance(option.type).open(callback, option)
}
