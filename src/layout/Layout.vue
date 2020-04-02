<template>
  <a-layout>
    <LayoutSider />
    <a-layout class="layout-main">
      <LayoutHeader />
      <LayoutContent />
      <LayoutFooter />
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutSider from './LayoutSider'
import LayoutHeader from './LayoutHeader'
import LayoutContent from './LayoutContent'
import LayoutFooter from './LayoutFooter'

export default {
  name: 'Layout',
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
  },
}
</script>
<style lang="less">
@import '~@/styles/layout';
</style>
