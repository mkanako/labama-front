<template>
  <div
    v-show="visible"
    class="loading-mask"
    :style="{background}"
  >
    <a-spin
      :tip="tip"
      :size="size"
    >
      <template v-slot:indicator>
        <a-icon
          type="loading"
          spin
        />
      </template>
    </a-spin>
  </div>
</template>
<script>
const defaultOptions = {
  size: 'large',
  background: 'rgba(0, 0, 0, 0)',
}

export default {
  name: 'Loading',
  data () {
    return {
      visible: false,
      tip: '',
      ...defaultOptions,
    }
  },
  methods: {
    close () {
      this.visible = false
    },
    open (tip = '', options = {}) {
      options = Object.assign({}, defaultOptions, options)
      Object.keys(defaultOptions).forEach(key => {
        this[key] = options[key]
      })
      this.tip = tip
      this.visible = true
    }
  }
}
</script>
<style lang="less">
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  z-index: 2000;

  .ant-spin {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
