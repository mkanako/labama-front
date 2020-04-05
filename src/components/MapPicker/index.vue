<template>
  <div class="media-input">
    <a-input
      v-bind="$attrs"
      spellcheck="false"
      :value="showValue"
      read-only
      @blur="$emit('blur')"
    >
      <template v-slot:addonBefore>
        <a-icon
          @click="handleEdit"
          type="edit"
        />
      </template>
      <template v-slot:addonAfter>
        <a-icon :component="mapIcon" />
        <span @click="choose">
          选择地图位置
        </span>
      </template>
    </a-input>
    <a-modal
      title="修改地图位置信息"
      v-model="modalVisible"
      :body-style="{paddingBottom:0}"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="form"
        :rules="rules"
        ref="form"
      >
        <a-form-model-item prop="lng">
          <a-input
            v-model="form.lng"
          >
            <template v-slot:addonBefore>
              经度:
            </template>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="lat">
          <a-input
            v-model="form.lat"
          >
            <template v-slot:addonBefore>
              纬度:
            </template>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="name">
          <a-input
            v-model="form.name"
          >
            <template v-slot:addonBefore>
              名称:
            </template>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="address">
          <a-input
            v-model="form.address"
          >
            <template v-slot:addonBefore>
              地址:
            </template>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import Picker from './TXMap'
import mapIcon from './map.svg?component'

export default {
  name: 'MapPicker',
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      required: false,
      default () {
        return {
          lat: '',
          lng: '',
          name: '',
          address: '',
          city: '',
        }
      },
    },
  },
  data () {
    const rules = {}
    Object.keys(this.value).forEach(key => {
      rules[key] = { required: true, message: '必填' }
    })
    return {
      stateValue: this.value,
      form: {},
      rules,
      modalVisible: false,
      mapIcon,
    }
  },
  watch: {
    value (val) {
      this.stateValue = val
    },
  },
  computed: {
    showValue () {
      if (this.stateValue.lat && this.stateValue.lng) {
        let text = `经纬度：${this.stateValue.lng},${this.stateValue.lat}`
        if (this.stateValue.address || this.stateValue.name) {
          text += ' 详情：' + [this.stateValue.name, this.stateValue.address].filter(item => !!item).join(',')
        }
        return text
      }
      return ''
    },
  },
  methods: {
    handleEdit () {
      this.form = Object.assign({}, this.stateValue)
      this.modalVisible = true
    },
    handleOk () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.modalVisible = false
          this.handleChange(this.form)
        }
      })
    },
    handleCancel () {
      this.$refs.form.clearValidate()
    },
    handleChange (val) {
      this.stateValue = val
      this.$emit('input', val)
      this.$emit('change')
    },
    choose () {
      Picker(result => {
        if (result && result.lat && result.lng) {
          this.handleChange(result)
        }
      }, this.value)
    },
  },
}
</script>
<style lang="less">
@import '~@/components/MediaInput/MediaInput.less';
</style>
