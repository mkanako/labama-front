<template>
  <div
    class="layout-sider-wrapper"
    :style="{ width }"
    v-show="visible"
  >
    <div
      v-show="isBreakPointTrigger && !collapsed"
      class="layout-sider-mask"
      @click="CLOSE_SIDEBAR"
    />
    <a-layout-sider
      width="256"
      collapsible
      :collapsed="isBreakPointTrigger ? false : collapsed"
      :trigger="null"
      ref="sider"
      breakpoint="md"
      @breakpoint="onBreakpoint"
    >
      <Logo />
      <LayoutSiderMenu />
    </a-layout-sider>
  </div>
</template>
<script>
import LayoutSiderMenu from './LayoutSiderMenu'
import Logo from './Logo'
import { mapMutations } from 'vuex'
import mixin from './mixin'

export default {
  name: 'LayoutSider',
  components: {
    LayoutSiderMenu,
    Logo,
  },
  mixins: [mixin],
  data () {
    return {
      width: 0,
      isBreakPointTrigger: false,
      visible: false,
    }
  },
  watch: {
    collapsed (val) {
      this.setWidth()
      if (this.isBreakPointTrigger) {
        this.visible = !val
      }
    },
  },
  methods: {
    ...mapMutations(['CLOSE_SIDEBAR']),
    onBreakpoint (flag) {
      this.isBreakPointTrigger = flag
      this.setWidth()
      if (this.isBreakPointTrigger && this.collapsed) {
        this.visible = false
      } else {
        this.visible = true
      }
    },
    setWidth () {
      if (this.isBreakPointTrigger) {
        this.width = null
      } else {
        this.width = this.$refs.sider[this.collapsed ? 'collapsedWidth' : 'width'] + 'px'
      }
    },
  },
}
</script>
