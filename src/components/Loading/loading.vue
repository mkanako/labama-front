<template>
  <div
    v-show="visible"
    class="loading-mask"
    :style="{background}"
  >
    <a-spin :tip="tip">
      <template v-slot:indicator>
        <a-icon
          type="loading"
          style="font-size: 24px"
          spin
        />
      </template>
    </a-spin>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tip: '',
      visible: false,
      background: null,
    }
  },
}
</script>
<style lang="less" scoped>
.loading-mask{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  z-index: 2000;
  .ant-spin{
    position: absolute;
    top: 50%;
  }
}
</style>
