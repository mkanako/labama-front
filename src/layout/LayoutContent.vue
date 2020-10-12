<template>
  <a-layout-content>
    <a-back-top :visibility-height="1000" />
    <LayoutTabsBar />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <a-card>
        <keep-alive :include="cachedViews">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </a-card>
    </transition>
  </a-layout-content>
</template>
<script>
import LayoutTabsBar from './LayoutTabsBar'
import { mapState } from 'vuex'

export default {
  name: 'LayoutContent',
  components: {
    LayoutTabsBar,
  },
  computed: mapState({
    cachedViews: state => state.app.cachedViews,
  }),
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
