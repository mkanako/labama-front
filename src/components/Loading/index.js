import Vue from 'vue'
import loadingVue from './loading'

const LoadingConstructor = Vue.extend(loadingVue)

const defaultOptions = {
  tip: '',
  background: 'rgba(0, 0, 0, 0)',
}

let instance

LoadingConstructor.prototype.close = function () {
  this.visible = false
}

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return
  options = Object.assign({}, defaultOptions, options)
  if (instance) {
    Object.keys(defaultOptions).forEach(key => {
      instance[key] = options[key]
    })
    Vue.nextTick(() => {
      instance.visible = true
    })
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

Loading.close = function () {
  instance && instance.close()
}

export default Loading
