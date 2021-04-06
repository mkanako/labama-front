<template>
  <div class="media-input">
    <a-input
      v-bind="$attrs"
      disabled
      placeholder="可选多张"
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
      v-show="value.length>0"
    >
      <div
        v-for="(item, index) in stateValue"
        :key="index"
      >
        <img
          @error="imgLoadErr($event)"
          :src="attachmentUrl(item)"
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
import { attachmentUrl } from '@/utils'
import Uploader from './Uploader'
import loadImageError from './icons/image-error.svg'

export default {
  name: 'MultiImageInput',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    maxSize: {
      type: Number,
      default: 2,
    },
  },
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
    attachmentUrl,
    choose () {
      Uploader(ret => {
        if (ret.length) {
          this.stateValue = this.stateValue.concat(ret)
          this.handleChange(this.stateValue)
        }
      }, {
        multiple: true,
        maxSize: this.maxSize,
      })
    },
    handleRemove (index) {
      this.stateValue.splice(index, 1)
      this.handleChange(this.stateValue)
    },
    handleChange (val) {
      this.$emit('input', val)
      this.$emit('change')
    },
    handleDbclick (index) {
      this.$prompt({
        initVal: this.stateValue[index],
      }).then(val => {
        if (val) {
          this.$set(this.stateValue, index, val)
          this.handleChange(this.stateValue)
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
