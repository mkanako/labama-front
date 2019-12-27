import config, { title } from '@/config'
import { DEVICE_TYPE } from '@/utils/device'
import { makeMutations, mapFields } from '@/utils/vuexHelper'
import { pick } from 'ramda'
import { mapState, mapGetters } from 'vuex'

const state = {
  menus: [],
  sidebar: true,
  device: DEVICE_TYPE.DESKTOP,
  config,
}

const app = {
  state,
  getters: {
    title: () => title,
    isTopMenu: state => state.config.layoutMode === 'topmenu',
    isSideMenu: state => state.config.layoutMode === 'sidemenu',
    isMobile: state => state.device === DEVICE_TYPE.MOBILE,
    isDesktop: state => state.device === DEVICE_TYPE.DESKTOP,
    isTablet: state => state.device === DEVICE_TYPE.TABLET,
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
        const ret = !item.hide && item.path !== '*' && item.meta && item.meta.title
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
    ...makeMutations(state.config, 'config'),
    ...makeMutations(['device', 'menus']),
    OPEN_SIDEBAR (state) {
      state.sidebar = true
    },
    CLOSE_SIDEBAR (state) {
      state.sidebar = false
    },
    TOGGLE_SIDEBAR (state) {
      state.sidebar = !state.sidebar
    },
    SET_FIXED_HEADER (state, value) {
      if (value === false) {
        state.config.autoHideHeader = false
      }
      state.config.fixedHeader = value
    },
  }
}

export const appPersistState = ['sidebar']
  .concat(process.env.NODE_ENV === 'development' ? 'config' : [])
  .map(key => `app.${key}`)

export const mixinApp = {
  computed: {
    ...mapState({
      device: state => state.app.device,
      sidebar: state => state.app.sidebar,
      collapsed: state => !state.app.sidebar,
    }),
    ...mapFields(state.config, 'app.config'),
    ...mapGetters(Object.keys(app.getters).filter(item => item.startsWith('is'))),
  },
  methods: {
    openSidebar () {
      this.$store.commit('OPEN_SIDEBAR')
    },
    closeSidebar () {
      this.$store.commit('CLOSE_SIDEBAR')
    },
    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
  }
}

export default app
