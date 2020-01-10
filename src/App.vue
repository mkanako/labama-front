<template>
  <a-config-provider :auto-insert-space-in-button="false">
    <a-locale-provider :locale="locale">
      <div id="app">
        <router-view />
      </div>
    </a-locale-provider>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data () {
    return {
      locale: zhCN,
    }
  },
}
</script>
<style lang="less">
@import '~@/styles/layout';
</style>
