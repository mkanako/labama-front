import Vue from 'vue'
import Uploader from './Uploader'
import { ConfigProvider } from 'ant-design-vue'

const instance = {}

const getInstance = type => {
  if (!instance[type]) {
    instance[type] = new Vue({
      el: document.createElement('div'),
      render () {
        return (
          <ConfigProvider autoInsertSpaceInButton={false}>
            <Uploader ref="uploader"/>
          </ConfigProvider>
        )
      }
    })
    document.body.appendChild(instance[type].$el)
  }
  return instance[type]
}

export default function (callback, option = {}) {
  const opt = Object.assign({
    multiple: false,
    type: 'image',
  }, option)
  getInstance(opt.type).$refs.uploader.open(callback, opt)
}
