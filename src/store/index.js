import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app, { appPersistState } from './modules/app'
import account from './modules/account'
import { name } from '../../package.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    account,
  },
  plugins: [
    createPersistedState({
      key: name + '_vuex',
      paths: [
        'account',
        ...appPersistState,
      ],
    }),
  ],
})
