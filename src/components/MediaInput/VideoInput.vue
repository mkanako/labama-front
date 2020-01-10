<template>
  <div class="media-input">
    <a-input
      v-bind="$attrs"
      :value="input"
      @change="handleChange"
      spellcheck="false"
    >
      <template v-slot:addonBefore>
        <a-icon
          @click="handlePlay"
          type="play-circle"
        />
      </template>
      <template v-slot:addonAfter>
        <a-button @click="choose">
          选择视频文件
        </a-button>
      </template>
    </a-input>
    <a-modal
      :after-close="handleClose"
      wrap-class-name="video-input-preview"
      v-model="dialogVisible"
      :footer="null"
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
import { tomedia } from '@/utils'
import Uploader from './Uploader'

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
      input: this.value,
      dialogVisible: false,
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
      }, { type: 'video' })
    },
    handlePlay () {
      if (this.src) {
        this.dialogVisible = true
      }
    },
    handleChange (val) {
      this.input = val
      this.$emit('change', val)
    },
    handleClose () {
      this.$refs.video.pause()
    }
  },
  computed: {
    src () {
      return tomedia(this.input)
    }
  },
}
</script>
<style lang="less">
@import './MediaInput.less';

.video-input-preview{
  .ant-modal-body{
    padding: 0;
    line-height: 0;
  }
  video{
    width:100%;
    outline:none;
  }
}
</style>
