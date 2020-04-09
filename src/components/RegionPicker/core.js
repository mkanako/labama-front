import { omit } from 'ramda'
import { Cascader } from 'ant-design-vue'
import './style.less'

const classPrefix = 'region-picker'

export default {
  name: 'RegionPicker',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    level: {
      type: Number,
      default: 3,
      validator (value) {
        return value >= 1 && value <= 3
      },
    },
  },
  created () {
    if (this.level === 1) {
      this.data = this.data.map(province => {
        if (province.children) {
          return omit(['children'], province)
        } else {
          return province
        }
      })
    } else if (this.level === 2) {
      this.data = this.data.map(province => {
        if (province.children) {
          province.children = province.children.map(city => {
            if (city.children) {
              return omit(['children'], city)
            } else {
              return city
            }
          })
        }
        return province
      })
    }
  },
  computed: {
    stateValue () {
      if (this.value) {
        return Object.keys(this.value)
          .map(key => {
            const item = this.value[key]
            if (item && item.code && item.name) {
              return { code: item.code, name: item.name }
            }
            return null
          })
          .filter(item => item)
      }
      return []
    },
    selectedValue () {
      return this.stateValue.map(item => item.code)
    },
    text () {
      return this.stateValue.map(item => item.name).join(' - ')
    },
  },
  methods: {
    onChange (value, selectedOptions) {
      const fields = ['province', 'city', 'area']
      const result = fields.slice(0, this.level).reduce((obj, key) => {
        obj[key] = null
        return obj
      }, {})
      if (value.length > 0) {
        selectedOptions.forEach((item, index) => {
          result[fields[index]] = omit(['children'], item)
        })
      }
      this.$emit('input', result)
      this.$emit('change', result)
    },
    onPopupVisibleChange (value) {
      if (!value) {
        this.$emit('blur')
      }
    },
    clearSelection (e) {
      this.$refs.cascader.clearSelection(e)
    },
  },
  render (h) {
    const props = {
      options: this.data,
      fieldNames: { label: 'name', value: 'code', children: 'children' },
      value: this.selectedValue,
    }
    const on = {
      change: this.onChange,
      popupVisibleChange: this.onPopupVisibleChange,
    }
    return <div class={classPrefix}>
      <Cascader
        ref="cascader"
        props={props}
        on={on}
      >
        <span class={`${classPrefix}-label`}>
          请选择
          <a-icon type="right" />
        </span>
      </Cascader>
      <span class={`${classPrefix}-result`}>{this.text}</span>
      <a-icon
        v-show={this.text}
        theme="filled"
        class={`${classPrefix}-clear`}
        type="close-circle"
        onClick={this.clearSelection}
      />
    </div>
  },
}
