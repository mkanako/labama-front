<template>
  <div class="logo">
    <router-link :to="{path:'/'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">
        {{ $store.getters.title }}
      </h1>
    </router-link>
  </div>
</template>
<script>
import LogoSvg from '@/assets/logo.svg?component'

export default {
  name: 'Logo',
  components: {
    LogoSvg,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
  },
}
</script>
