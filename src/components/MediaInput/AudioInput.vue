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
          :type="palyIcon"
        />
      </template>
      <template v-slot:addonAfter>
        <a-button @click="choose">
          选择音频文件
        </a-button>
      </template>
    </a-input>
  </div>
</template>
<script>
import { tomedia } from '@/utils'
import Uploader from './Uploader'
import { mapHelpers } from '@/store/modules/AudioInputPlayer'

const { mapState, mapActions } = mapHelpers

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
    this.pause(this._uid)
  },
  methods: {
    ...mapActions(['pause', 'play']),
    choose () {
      Uploader(ret => {
        if (ret) {
          this.handleChange(ret)
        }
      }, { type: 'audio' })
    },
    handlePlay () {
      if (this.src) {
        this.play({ src: this.src, id: this._uid })
      }
    },
    handleChange (val) {
      this.input = val
      this.$emit('change', val)
    },
  },
  watch: {
    input () {
      this.pause(this._uid)
    },
    value (val) {
      this.input = val
    },
  },
  computed: {
    ...mapState({
      palyIcon (state) {
        if (state.id !== this._uid) {
          return 'play-circle'
        }
        switch (state.status) {
          case 'paused':
            return 'play-circle'
          case 'playing':
            return 'pause-circle'
        }
      }
    }),
    src () {
      return tomedia(this.input)
    }
  },
}
</script>
<style lang="less">
@import './MediaInput.less';
</style>
