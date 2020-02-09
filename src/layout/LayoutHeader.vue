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
import { mapMutations } from 'vuex'
import LayoutHeaderRight from './LayoutHeaderRight'
import mixin from './mixin'

export default {
  name: 'LayoutHeader',
  components: {
    LayoutHeaderRight,
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR'])
  },
}
</script>
