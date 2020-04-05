import Vue from 'vue'
import AppConfigProvider from '@/AppConfigProvider'
import Picker from './Picker'

let instance

export default function (...args) {
  if (!instance) {
    instance = new Vue({
      el: document.createElement('div'),
      render: h => <AppConfigProvider><Picker ref="picker"/></AppConfigProvider>,
    })
    document.body.appendChild(instance.$el)
  }
  instance.$refs.picker.open(...args)
}
