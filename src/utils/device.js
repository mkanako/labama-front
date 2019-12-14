import enquireJs from 'enquire.js'
import { mapState } from 'vuex'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

export const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

export const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    const match = type => ({
      match: () => {
        $store.commit('SET_DEVICE', type)
      }
    })
    enquireJs
      .register('screen and (max-width: 576px)', match(DEVICE_TYPE.MOBILE))
      .register('screen and (min-width: 576px) and (max-width: 1199px)', match(DEVICE_TYPE.TABLET))
      .register('screen and (min-width: 1200px)', match(DEVICE_TYPE.DESKTOP))
  }
}
