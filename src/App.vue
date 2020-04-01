<template>
  <AppConfigProvider>
    <div id="app">
      <router-view />
    </div>
  </AppConfigProvider>
</template>
<script>
import AppConfigProvider from './AppConfigProvider'

export default {
  name: 'App',
  components: {
    AppConfigProvider,
  },
}
</script>
<style lang="less">
@import '~@/styles/layout';
</style>
