<template>
  <a-layout :class="['app-layout', device]">
    <a-drawer
      v-if="isMobile"
      placement="left"
      :wrap-class-name="`drawer-sidebar ${navTheme}`"
      :closable="false"
      :visible="sidebar"
      @close="closeSidebar()"
    >
      <side-menu />
    </a-drawer>

    <side-menu v-else-if="isSideMenu" />

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft }"
    >
      <global-header />

      <a-layout-content :style="{ paddingTop: fixedHeader ? '64px' : '0' }">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <router-view :key="$route.fullPath" />
        </transition>
      </a-layout-content>

      <global-footer />

      <setting-drawer v-if="development" />
    </a-layout>
  </a-layout>
</template>
<script>
import SideMenu from './components/SideMenu'
import GlobalHeader from './components/GlobalHeader'
import GlobalFooter from './components/GlobalFooter'
import { mixinApp } from '@/store/modules/app'

export default {
  name: 'BasicLayout',
  mixins: [mixinApp],
  components: {
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer: () => import(/* webpackChunkName: "SettingDrawer" */ './components/SettingDrawer'),
  },
  data () {
    return {
      development: process.env.NODE_ENV === 'development',
    }
  },
  computed: {
    contentPaddingLeft () {
      if (!this.fixedSidebar || this.isMobile) {
        return '0'
      }
      if (this.sidebar) {
        return '256px'
      }
      return '80px'
    },
  },
}
</script>
<style lang="less">
@import '~@/styles/layout';

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
