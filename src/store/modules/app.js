import { title } from '@/config'

const state = {
  sidebar: true,
}

export default {
  name: 'app',
  state,
  persistState: ['sidebar'],
  getters: {
    title: () => title,
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
  }
}
