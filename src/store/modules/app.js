import { title } from '@/config'

const state = {
  sidebar: true,
}

const app = {
  state,
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

export const appPersistState = ['sidebar'].map(key => `app.${key}`)

export default app
