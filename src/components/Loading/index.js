import Vue from 'vue'
import loadingVue from './loading'

const LoadingConstructor = Vue.extend(loadingVue)

const defaults = {
  tip: '',
  background: 'rgba(0, 0, 0, 0)',
}

let instance

LoadingConstructor.prototype.close = function () {
  this.visible = false
}

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return
  options = Object.assign({}, defaults, options)
  if (instance) {
    Vue.nextTick(() => {
      instance.visible = true
    })
    for (let key in options) {
      instance[key] = options[key]
    }
    return instance
  }
  instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
  })
  return instance
}

export default Loading
