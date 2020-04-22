<template>
  <a-popover
    trigger="click"
    v-model="visible"
    overlay-class-name="color-picker-popover"
    arrow-point-at-center
    placement="right"
  >
    <template v-slot:content>
      <picker
        :value="color"
        :disable-alpha="disableAlpha"
        :disable-fields="disableFields"
        @input="updateColor"
      />
      <div
        class="color-picker-preset-colors-list"
        v-if="presetColors.length > 0"
      >
        <div
          v-for="item in presetColorsWithRgb"
          :key="item[0]"
          :class="['color-picker-preset-color', isAlpha(item[1]) ? 'is-alpha' : '']"
        >
          <span
            :style="{ backgroundColor : toRgbStr(item[1]) }"
            @click="change(item[1])"
          />
        </div>
      </div>
      <div class="color-picker-btns">
        <a-button
          type="link"
          size="small"
          @click="clear"
        >
          清空
        </a-button>
        <a-button
          size="small"
          @click="confirm"
        >
          确定
        </a-button>
      </div>
    </template>
    <div class="color-picker-trigger">
      <span :class="['color-picker-color', isAlpha(valueColor)? 'is-alpha' : '']">
        <span :style="{ backgroundColor : toRgbStr(valueColor) }">
          <a-icon
            v-show="!value"
            type="close"
          />
        </span>
      </span>
    </div>
  </a-popover>
</template>
<script>
import { Chrome as picker } from 'vue-color'
import tinycolor from 'tinycolor2'

export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      default: '',
    },
    colorFormat: {
      type: String,
      default: 'hex',
      validator (value) {
        return ['hex', 'rgb', 'hsl', 'hsv'].indexOf(value) !== -1
      },
    },
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
    presetColors: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      visible: false,
      color: '',
    }
  },
  components: {
    picker,
  },
  watch: {
    value: {
      handler: function (val) {
        if (val) {
          this.color = this.toRgb(val)
        }
      },
      immediate: true,
    },
    visible (val) {
      !val && this.$emit('blur')
    },
  },
  computed: {
    valueColor () {
      return this.toRgb(this.value)
    },
    presetColorsWithRgb () {
      return this.presetColors.map(color => [color, this.toRgb(color)])
    },
  },
  methods: {
    toRgb (val) {
      if (val) {
        return tinycolor(val).toRgb()
      }
    },
    toRgbStr (rgb) {
      if (rgb && typeof rgb === 'object') {
        return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`
      }
    },
    isAlpha (rgb) {
      if (rgb && typeof rgb === 'object') {
        return rgb.a < 1
      }
      return false
    },
    updateColor (val) {
      this.color = val.rgba
    },
    change (val) {
      if (val) {
        let format = this.colorFormat
        if (format === 'hex' && val.a < 1) {
          format += '8'
        }
        val = tinycolor(val).toString(format)
      }
      this.$emit('input', val)
      this.$emit('change', val)
      this.visible = false
    },
    confirm () {
      this.change(this.color)
    },
    clear () {
      this.change('')
    },
  },
}
</script>
<style lang="less">
@import "~@/styles/var";

.is-alpha() {
  &.is-alpha {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==');
  }
}

.color-picker-popover {
  .ant-popover-inner-content {
    & > div:first-child {
      box-shadow: none;
    }

    padding: 0;
  }

  .color-picker-preset-colors-list {
    display: flex;
    width: 225px;
    flex-wrap: wrap;
    padding: 0 10px;

    .color-picker-preset-color {
      .is-alpha();

      border-radius: 3px;
      margin: 0 6% 10px;
      cursor: pointer;
      width: 8%;
      position: relative;

      &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }

      & > span {
        height: 100%;
        width: 100%;
        position: absolute;
        border-radius: 3px;
      }
    }
  }

  .color-picker-btns {
    text-align: right;
    padding-bottom: 10px;
    padding-right: 10px;
  }
}

.color-picker-trigger {
  display: inline-block;
  height: @btn-height-base;
  width: @btn-height-base;
  padding: 4px;
  border-width: @btn-border-width;
  border-style: @btn-border-style;
  border-radius: @btn-border-radius-base;
  border-color: @btn-default-border;
  cursor: pointer;
  vertical-align: top;

  .color-picker-color {
    .is-alpha();

    & > span:first-child {
      display: block;
      height: 100%;
    }

    position: relative;
    display: block;
    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: 2px;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .anticon {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
