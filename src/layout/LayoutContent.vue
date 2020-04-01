<template>
  <a-layout-content>
    <a-back-top :visibility-height="1000" />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="$route.fullPath" />
    </transition>
  </a-layout-content>
</template>
<script>
export default {
  name: 'LayoutContent',
}
</script>
<style lang="less">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
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
