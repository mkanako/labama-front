<template>
  <div class="media-input">
    <a-input
      v-bind="$attrs"
      :value="stateValue"
      @change="handleChange"
      spellcheck="false"
      allow-clear
      @blur="$emit('blur')"
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
import { attachmentUrl } from '@/utils'
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
      stateValue: this.value,
    }
  },
  watch: {
    value (val) {
      this.stateValue = val
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
    handleChange (e) {
      const val = typeof e.target !== 'undefined' ? e.target.value : e
      this.stateValue = val
      this.$emit('input', val)
      this.$emit('change')
    },
    imgLoadErr (event) {
      if (this.value) {
        event.target.src = loadImageError
      }
    },
  },
  computed: {
    src () {
      return attachmentUrl(this.stateValue)
    },
  },
}
</script>
<style lang="less">
  @import './ImageInput.less';
</style>
