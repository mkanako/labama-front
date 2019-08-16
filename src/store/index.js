import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    account,
  },
  state: {
    menus: [],
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
  },
  actions: {
    GenerateMenus ({ commit }, routes) {
      const menus = routes.filter(item =>
        !item.hide && item.path !== '*' && item.meta && item.meta.title
      )
      commit('SET_MENUS', menus)
    }
  },
  plugins: [
    createPersistedState({
      key: 'admin_vuex',
      paths: [
        'app',
        'account',
      ],
    }),
  ],
})
