<template>
  <a-layout-sider
    :class="['sider', isDesktop ? null : 'shadow', navTheme, fixedSidebar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsed="isMobile?false:collapsed"
  >
    <logo />
    <Menu
      mode="inline"
      @click="handleClick"
      style="padding: 16px 0px;"
    />
  </a-layout-sider>
</template>
<script>
import Logo from './Logo'
import Menu from './Menu'
import { mixinApp } from '@/store/modules/app'

export default {
  name: 'SideMenu',
  components: {
    Logo,
    Menu,
  },
  mixins: [mixinApp],
  methods: {
    handleClick () {
      if (this.isMobile) {
        this.closeSidebar()
      }
    }
  }
}
</script>
