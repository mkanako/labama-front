import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import account from './modules/account'
import { name } from '@root/package.json'

Vue.use(Vuex)

function genPersistStatePaths (...modules) {
  const paths = []
  modules.forEach(item => {
    if (item.persistState && Array.isArray(item.persistState)) {
      paths.push(...item.persistState.map(key => `${item.name}.${key}`))
    } else if (item.name) {
      paths.push(item.name)
    }
  })
  return paths
}

export default new Vuex.Store({
  modules: {
    [app.name]: app,
    [account.name]: account,
  },
  plugins: [
    createPersistedState({
      key: name + '_vuex',
      paths: genPersistStatePaths(app, account),
    }),
  ],
})
