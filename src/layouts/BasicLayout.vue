<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrap-class-name="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
      />
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    />

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <router-view :key="$route.fullPath" />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="development" />
    </a-layout>
  </a-layout>
</template>
<script>
import SideMenu from './components/Menu/SideMenu'
import GlobalHeader from './components/GlobalHeader'
import GlobalFooter from './components/GlobalFooter'
import { mapState, mapMutations } from 'vuex'
import { mixinApp } from '@/store/modules/app'
import { mixinDevice } from '@/utils/device'

function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export default {
  name: 'BasicLayout',
  mixins: [mixinApp, mixinDevice],
  components: {
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer: () => import(/* webpackChunkName: "SettingDrawer" */ './components/SettingDrawer')
  },
  data () {
    return {
      development: process.env.NODE_ENV === 'development',
      collapsed: false,
    }
  },
  computed: {
    ...mapState({
      menus: state => state.app.menus
    }),
    contentPaddingLeft () {
      if (!this.fixedSiderbar || this.isMobile()) {
        return '0'
      }
      if (this.siderbar) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    siderbar (val) {
      this.collapsed = !val
    }
  },
  created () {
    this.collapsed = !this.siderbar
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapMutations(['SET_SIDERBAR']),
    toggle () {
      this.collapsed = !this.collapsed
      this.SET_SIDERBAR(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.siderbar) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>
<style lang="less">
@import '~@/styles/global.less';

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
