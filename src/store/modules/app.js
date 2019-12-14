import config, { title } from '@/config'
import { DEVICE_TYPE } from '@/utils/device'
import { makeMutations, mapFields } from '@/utils/vuexHelper'
import { omit } from 'ramda'
import { mapState, mapGetters } from 'vuex'

const state = {
  menus: [],
  siderbar: true,
  device: DEVICE_TYPE.DESKTOP,
  config,
}

export const appPersistState = [
  'siderbar',
  ...(process.env.NODE_ENV === 'development' ? ['config'] : []),
].map(key => `app.${key}`)

export const mixinApp = {
  computed: {
    ...mapState({
      siderbar: state => state.app.siderbar,
    }),
    ...mapFields(state.config, 'app.config'),
  },
  methods: {
    ...mapGetters([
      'isTopMenu',
      'isSideMenu',
    ]),
  }
}

export default {
  state,
  getters: {
    isTopMenu: state => state.config.layoutMode === 'topmenu',
    isSideMenu: state => state.config.layoutMode === 'sidemenu',
    title: () => title,
  },
  actions: {
    GenerateMenus ({ commit }, routes) {
      const menus = routes.filter(item =>
        !item.hide && item.path !== '*' && item.meta && item.meta.title
      )
      commit('SET_MENUS', menus)
    }
  },
  mutations: {
    ...makeMutations(state.config, 'config'),
    ...makeMutations(omit(['config'], state)),
    OPEN_SIDERBAR (state) {
      state.siderbar = true
    },
    CLOSE_SIDERBAR (state) {
      state.siderbar = false
    },
    SET_FIXED_HEADER (state, value) {
      if (value === false) {
        state.config.autoHideHeader = false
      }
      state.config.fixedHeader = value
    },
  }
}
