import Vue from 'vue'
import VueUploader from './Uploader'

const instance = {}

const getInstance = name => {
  if (!instance[name]) {
    instance[name] = new (Vue.extend(VueUploader))({
      el: document.createElement('div')
    })
    document.body.appendChild(instance[name].$el)
  }
  return instance[name]
}

export default function (callback, option = {}) {
  const opt = Object.assign({
    multiple: false,
    type: 'image',
  }, option)
  getInstance(opt.type).open(callback, opt)
}
