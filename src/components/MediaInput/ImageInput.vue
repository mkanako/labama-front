<template>
  <div>
    <a-input-search
      v-bind="$attrs"
      :value="input"
      @change="handleChange"
      @search="choose"
      spellcheck="false"
    >
      <template v-slot:enterButton>
        <a-button icon="picture">
          选择图片文件
        </a-button>
      </template>
    </a-input-search>
    <div
      class="img-input-preview"
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
import { tomedia } from '@/utils'
import Uploader from './Uploader'
import loadImageError from './image-error.svg'

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
      return tomedia(this.input)
    },
  },
}
</script>
<style lang="less">
  @import './ImageInput.less';
</style>
