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
          type="play-circle"
        />
      </template>
      <template v-slot:addonAfter>
        <a-icon :component="videoIcon" />
        <span @click="choose">
          选择视频文件
        </span>
      </template>
    </a-input>
    <a-modal
      :after-close="handleClose"
      wrap-class-name="media-input-video-preview"
      v-model="dialogVisible"
      :footer="null"
      centered
    >
      <video
        ref="video"
        :src="src"
        controls
      />
    </a-modal>
  </div>
</template>
<script>
import { attachUrl } from '@/utils'
import Uploader from './Uploader'
import videoIcon from './icons/video.svg?component'

export default {
  name: 'VideoInput',
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
      dialogVisible: false,
      videoIcon,
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
      }, { type: 'video' })
    },
    handlePlay () {
      if (this.src) {
        this.dialogVisible = true
      }
    },
    handleChange (e) {
      const val = typeof e.target !== 'undefined' ? e.target.value : e
      this.stateValue = val
      this.$emit('input', val)
      this.$emit('change')
    },
    handleClose () {
      this.$refs.video.pause()
    },
  },
  computed: {
    src () {
      return attachUrl(this.stateValue)
    },
  },
}
</script>
<style lang="less">
@import './MediaInput.less';

.media-input-video-preview {
  .ant-modal-body {
    padding: 0;
    line-height: 0;
  }

  video {
    width: 100%;
    outline: none;
    max-height: 95vh;
  }
}
</style>
