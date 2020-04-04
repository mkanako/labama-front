<template>
  <a-result
    :title="typeOf.title"
    :sub-title="typeOf.desc"
  >
    <template v-slot:icon>
      <img :src="typeOf.img">
    </template>
    <template v-slot:extra>
      <a-button
        type="primary"
        @click="$router.replace({ path: '/' })"
      >
        返回首页
      </a-button>
    </template>
  </a-result>
</template>
<script>
import types from './types'

export default {
  name: 'ExceptionPage',
  props: {
    type: {
      type: Number,
      default: 404,
    },
  },
  computed: {
    typeOf () {
      return types[this.type]
    },
  },
}
</script>
