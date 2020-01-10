import { title } from '@/config'
import { makeMutations } from '@/utils/vuexHelper'
import { pick } from 'ramda'

const state = {
  menus: [],
  sidebar: true,
}

const app = {
  state,
  getters: {
    title: () => title,
  },
  actions: {
    GenerateMenus ({ commit }, routes) {
      const pickUp = arr => arr.map(item => {
        item = pick(['path', 'meta', 'children'], item)
        if (item.children) {
          if (item.children.length === 0) {
            delete item.children
          } else {
            item.children = pickUp(item.children)
          }
        }
        return item
      })
      const filter = arr => arr.filter(item => {
        const ret = item.path !== '*' && item.meta && item.meta.title && !item.meta.hide
        if (ret && item.children) {
          item.children = filter(item.children)
        }
        return ret
      })
      const menus = pickUp(filter(routes))
      commit('SET_MENUS', menus)
    }
  },
  mutations: {
    ...makeMutations(['menus']),
    OPEN_SIDEBAR (state) {
      state.sidebar = true
    },
    CLOSE_SIDEBAR (state) {
      state.sidebar = false
    },
    TOGGLE_SIDEBAR (state) {
      state.sidebar = !state.sidebar
    },
  }
}

export const appPersistState = ['sidebar'].map(key => `app.${key}`)

export default app
