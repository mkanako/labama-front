import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      collapsed: state => !state.app.sidebar,
    }),
  },
}
