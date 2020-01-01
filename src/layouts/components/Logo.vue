<template>
  <div class="logo">
    <router-link :to="{path:'/'}">
      <img src="@/assets/logo.svg">
      <h1 v-if="showTitle">
        {{ $store.getters.title }}
      </h1>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
  },
}
</script>
