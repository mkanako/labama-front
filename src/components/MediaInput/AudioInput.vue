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
      <template v-slot:addonBefore>
        <a-icon
          @click="handlePlay"
          :type="playIcon"
        />
      </template>
      <template v-slot:addonAfter>
        <a-icon :component="audioIcon" />
        <span @click="choose">
          选择音频文件
        </span>
      </template>
    </a-input>
  </div>
</template>
<script>
import { attachmentUrl } from '@/utils'
import Uploader from './Uploader'
import { play, pause, playStatus } from '@/store/modules/AudioInputPlayer'
import audioIcon from './icons/audio.svg?component'

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
      stateValue: this.value,
      audioIcon,
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
    handleChange (e) {
      const val = typeof e.target !== 'undefined' ? e.target.value : e
      this.stateValue = val
      this.$emit('input', val)
      this.$emit('change')
    },
  },
  watch: {
    stateValue () {
      this.pause()
    },
    value (val) {
      this.stateValue = val
    },
  },
  computed: {
    playIcon: playStatus(status => status === 'paused' ? 'play-circle' : 'pause-circle'),
    src () {
      return attachmentUrl(this.stateValue)
    },
  },
}
</script>
<style lang="less">
@import './MediaInput.less';
</style>
