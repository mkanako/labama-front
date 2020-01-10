<template>
  <a-layout-header>
    <a-icon
      class="sidebar-toggle"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="TOGGLE_SIDEBAR"
    />
    <LayoutHeaderRight />
  </a-layout-header>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import LayoutHeaderRight from './LayoutHeaderRight'

export default {
  name: 'LayoutHeader',
  components: {
    LayoutHeaderRight,
  },
  computed: {
    ...mapState({
      collapsed: state => !state.app.sidebar,
    }),
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR'])
  },
}
</script>
