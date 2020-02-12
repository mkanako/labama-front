<template>
  <div class="media-input">
    <a-input
      v-bind="$attrs"
      :value="input"
      @change="handleChange"
      spellcheck="false"
    >
      <template v-slot:addonAfter>
        <span @click="choose">
          <a-icon type="picture" />
          选择图片文件
        </span>
      </template>
    </a-input>
    <div
      class="img-preview"
      v-show="value"
    >
      <div>
        <img
          @error="imgLoadErr($event)"
          :src="src"
        >
        <a-icon
          @click="handleRemove"
          type="close-circle"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { attachUrl } from '@/utils'
import Uploader from './Uploader'
import loadImageError from './icons/image-error.svg'

export default {
  name: 'ImageInput',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  inheritAttrs: false,
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
    choose () {
      Uploader(ret => {
        if (ret) {
          this.handleChange(ret)
        }
      })
    },
    handleRemove () {
      this.handleChange('')
    },
    handleChange (val) {
      this.input = val
      this.$emit('change', val)
    },
    imgLoadErr (event) {
      if (this.value) {
        event.target.src = loadImageError
      }
    },
  },
  computed: {
    src () {
      return attachUrl(this.input)
    },
  },
}
</script>
<style lang="less">
  @import './ImageInput.less';
</style>
