<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixedSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    />
  </a-layout-sider>
</template>
<script>
import Logo from '../Logo'
import SMenu from './menu'
import { mixinApp } from '@/store/modules/app'
import { mixinDevice } from '@/utils/device'

export default {
  name: 'SideMenu',
  components: {
    Logo,
    SMenu,
  },
  mixins: [mixinApp, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
