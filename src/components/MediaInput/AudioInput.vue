<template>
  <div
    class="media-input"
    spellcheck="false"
  >
    <a-input
      v-bind="$attrs"
      :value="input"
      @change="handleChange"
    >
      <template v-slot:addonBefore>
        <a-icon
          @click="handlePlay"
          :type="playIcon"
        />
      </template>
      <template v-slot:addonAfter>
        <span @click="choose">
          选择音频文件
        </span>
      </template>
    </a-input>
  </div>
</template>
<script>
import { attachUrl } from '@/utils'
import Uploader from './Uploader'
import { play, pause, playStatus } from '@/store/modules/AudioInputPlayer'

export default {
  name: 'AudioInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      input: this.value
    }
  },
  beforeDestroy () {
    this.pause()
  },
  methods: {
    play,
    pause,
    choose () {
      Uploader(ret => {
        if (ret) {
          this.handleChange(ret)
        }
      }, { type: 'audio' })
    },
    handlePlay () {
      if (this.src) {
        this.play(this.src)
      }
    },
    handleChange (val) {
      this.input = val
      this.$emit('change', val)
    },
  },
  watch: {
    input () {
      this.pause()
    },
    value (val) {
      this.input = val
    },
  },
  computed: {
    playIcon: playStatus(status => status === 'paused' ? 'play-circle' : 'pause-circle'),
    src () {
      return attachUrl(this.input)
    }
  },
}
</script>
<style lang="less">
@import './MediaInput.less';
</style>
