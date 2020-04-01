import Vue from 'vue'
import Loading from './Loading'

let instance

export default {
  open (...args) {
    if (!instance) {
      const LoadingComponent = Vue.extend(Loading)
      instance = new LoadingComponent({
        el: document.createElement('div'),
      })
      document.body.appendChild(instance.$el)
    }
    instance.open(...args)
  },
  close () {
    instance && instance.close()
  },
}
