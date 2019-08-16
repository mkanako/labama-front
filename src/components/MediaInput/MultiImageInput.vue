<template>
  <div>
    <a-input-search
      v-bind="$attrs"
      @change="handleChange"
      @search="choose"
      disabled
      placeholder="可选多张"
    >
      <template v-slot:enterButton>
        <a-button icon="picture">
          选择图片文件
        </a-button>
      </template>
    </a-input-search>
    <div
      class="img-input-preview"
      v-show="input.length>0"
    >
      <div
        v-for="(item, index) in input"
        :key="index"
      >
        <img
          @error="imgLoadErr($event)"
          :src="tomedia(item)"
          @dblclick="handleDbclick(index)"
        >
        <a-icon
          @click="handleRemove(index)"
          type="close-circle"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { tomedia } from '@/utils'
import Uploader from './Uploader'
import loadImageError from './image-error.svg'

export default {
  name: 'MultiImageInput',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      input: this.value,
    }
  },
  watch: {
    value (val) {
      this.input = val
    },
  },
  methods: {
    tomedia,
    choose () {
      Uploader(ret => {
        if (ret.length) {
          this.input = this.input.concat(ret)
          this.handleChange(this.input)
        }
      }, { multiple: true })
    },
    handleRemove (index) {
      this.input.splice(index, 1)
      this.handleChange(this.input)
    },
    handleChange (val) {
      this.$emit('change', val)
    },
    handleDbclick (index) {
      this.$prompt({
        initVal: this.input[index]
      }).then(val => {
        if (val) {
          this.$set(this.input, index, val)
          this.handleChange(this.input)
        }
      })
    },
    imgLoadErr (event) {
      event.target.src = loadImageError
    },
  },
}
</script>
<style lang="less">
  @import './ImageInput.less';
</style>
