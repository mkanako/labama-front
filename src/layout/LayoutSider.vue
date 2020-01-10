<template>
  <div
    class="layout-sider-wrapper"
    :style="{width}"
    v-show="width"
  >
    <a-layout-sider
      width="256"
      collapsible
      :collapsed="collapsed"
      :trigger="null"
      ref="sider"
    >
      <Logo />
      <LayoutSiderMenu />
    </a-layout-sider>
  </div>
</template>
<script>
import LayoutSiderMenu from './LayoutSiderMenu'
import Logo from './Logo'
import { mapState } from 'vuex'

export default {
  name: 'LayoutSider',
  components: {
    LayoutSiderMenu,
    Logo,
  },
  data () {
    return {
      width: 0,
    }
  },
  watch: {
    collapsed () {
      this.setWidth()
    },
  },
  computed: {
    ...mapState({
      collapsed: state => !state.app.sidebar,
    }),
  },
  mounted () {
    this.$nextTick(() => {
      this.setWidth()
    })
  },
  methods: {
    setWidth () {
      this.width = this.$refs.sider[this.collapsed ? 'collapsedWidth' : 'width'] + 'px'
    },
  },
}
</script>
