import { title } from '@/config'

const state = {
  sidebar: true,
  cachedViews: [],
  tabList: [],
}

export default {
  name: 'app',
  state,
  persistState: ['sidebar'],
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
    OPEN_TAB (state, tab) {
      const index = state.tabList.findIndex(item => item.path === tab.path)
      if (index >= 0) {
        state.tabList[index] = tab
      } else {
        state.tabList.push(tab)
      }
    },
    SET_TAB_LIST (state, tabList) {
      state.tabList = tabList
    },
  },
}
