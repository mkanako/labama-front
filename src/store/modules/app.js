import { title } from '@/config'
import router from '@/router'

const state = {
  sidebar: true,
  cachedViews: [],
  tabList: [],
  tabActived: {
    path: '',
    title: '',
  },
}

export default {
  name: 'app',
  state,
  persistState: ['sidebar', 'tabActived'],
  getters: {
    title: () => title,
    findTab: state => path => state.tabList.find(item => item.path === path),
  },
  mutations: {
    OPEN_SIDEBAR (state) {
      state.sidebar = true
    },
    CLOSE_SIDEBAR (state) {
      state.sidebar = false
    },
    TOGGLE_SIDEBAR (state) {
      state.sidebar = !state.sidebar
    },
    ADD_CACHED_VIEW (state, view) {
      if (view && !state.cachedViews.includes(view)) {
        state.cachedViews.push(view)
      }
    },
    REMOVE_CACHED_VIEW (state, view) {
      if (view) {
        const index = state.cachedViews.indexOf(view)
        if (index > -1) {
          state.cachedViews.splice(index, 1)
        }
      }
    },
    SET_TAB_TITLE (state, title) {
      const index = state.tabList.findIndex(item => item.path === router.currentRoute.path)
      if (index >= 0) {
        Object.assign(state.tabList[index], { title })
        state.tabActived.title = title
      }
    },
    ADD_TAB (state, tab) {
      const index = state.tabList.findIndex(item => item.path === tab.path)
      if (index >= 0) {
        state.tabList[index] = tab
      } else {
        state.tabList.push(tab)
      }
    },
    REMOVE_TAB (state, index) {
      state.tabList.splice(index, 1)
    },
    SET_TAB_ACTIVED (state, args) {
      if (Array.isArray(args)) {
        state.tabActived.path = args[0]
        state.tabActived.title = args[1]
      } else {
        state.tabActived.path = args
        const tab = state.tabList.find(item => item.path === args)
        if (tab) {
          state.tabActived.title = tab.title
        }
      }
    },
  },
  actions: {
    activeTab ({ commit, getters }, args) {
      const tab = typeof args === 'object' ? args : getters.findTab(args)
      if (tab) {
        return router.push({ path: tab.path, query: tab.query }).then(() => {
          commit('SET_TAB_ACTIVED', [tab.path, tab.title])
        })
      }
    },
    closeTab ({ commit, state }, path) {
      const index = state.tabList.findIndex(item => item.path === path)
      if (index >= 0) {
        let count = 0
        state.tabList.some(tab => {
          if (tab.viewName === state.tabList[index].viewName) {
            count++
          }
          if (count > 1) {
            return true
          }
        })
        if (count <= 1) {
          commit('REMOVE_CACHED_VIEW', state.tabList[index].viewName)
        }
        commit('REMOVE_TAB', index)
        return index
      }
      return false
    },
    createTab ({ commit }, { route, title = null }) {
      if (!title && route.meta && !route.meta.hide && route.matched.length > 1) {
        for (let i = route.matched.length - 1; i >= 0; i--) {
          if (route.matched[i].meta && route.matched[i].meta.title) {
            title = route.matched[i].meta.title
            break
          }
        }
      }
      if (title) {
        const components = router.getMatchedComponents()
        if (components.length > 1) {
          const viewName = components[components.length - 1].name
          if (viewName) {
            commit('ADD_CACHED_VIEW', viewName)
            commit('ADD_TAB', {
              path: route.path,
              query: route.query,
              title,
              viewName,
            })
            commit('SET_TAB_ACTIVED', [route.path, title])
          }
        }
      }
    },
    reloadView ({ dispatch }) {
      return dispatch('openView', { path: router.currentRoute.path })
    },
    openView ({ dispatch, getters }, { path, title = null }) {
      const tab = getters.findTab(path)
      if (tab) {
        if (router.currentRoute.path === path) {
          return router.reload().then(route => {
            tab.query = route.query
          })
        } else {
          return dispatch('activeTab', tab)
        }
      } else {
        return router.push({ path }).then(route => {
          dispatch('createTab', { route, title })
        })
      }
    },
  },
}
