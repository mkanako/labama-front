<template>
  <router-link
    class="logo"
    :to="{path:'/'}"
  >
    <img src="@/assets/logo.svg">
    <span class="pl-10">{{ $store.getters.title }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'Logo',
}
</script>
