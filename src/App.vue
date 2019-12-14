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
import { AppDeviceEnquire } from '@/utils/device'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
