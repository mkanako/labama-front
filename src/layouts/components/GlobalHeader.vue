<template>
  <transition name="showHeader">
    <div
      v-if="visible"
      class="header-animat"
    >
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebar ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }"
      >
        <div
          v-if="isSideMenu"
          class="header"
        >
          <a-icon
            class="trigger"
            :type="isMobile?'menu-fold':(collapsed ? 'menu-unfold' : 'menu-fold')"
            @click="toggle"
          />
          <header-right />
        </div>
        <div
          v-else
          :class="['top-nav-header-index', navTheme]"
        >
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo
                class="top-nav-header"
                :show-title="!isMobile"
              />
              <Menu
                v-if="!isMobile"
                mode="horizontal"
              />
              <a-icon
                v-else
                class="trigger"
                :type="collapsed ? 'menu-fold' : 'menu-unfold'"
                @click="toggle"
              />
            </div>
            <header-right class="header-index-right" />
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>
<script>
import HeaderRight from './HeaderRight'
import Menu from './Menu'
import Logo from './Logo'
import { mixinApp } from '@/store/modules/app'

export default {
  name: 'GlobalHeader',
  components: {
    HeaderRight,
    Menu,
    Logo
  },
  mixins: [mixinApp],
  data () {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.toggleSidebar()
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="less">
@import '~@/styles/index.less';

.header-animat{
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
