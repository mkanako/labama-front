import { map, type, filter } from 'ramda'

function ruleComplete (rule) {
  rule.forEach(item => {
    if (!item.trigger) {
      item.trigger = 'change'
    }
    if (item.required === true) {
      if (item.type === 'map') {
        item.type = 'object'
        item.fields = ['lat', 'lng', 'name', 'address'].reduce((obj, e) => {
          obj[e] = { required: true, message: item.message || '请选择地图位置' }
          return obj
        }, {})
      }
      if (item.type === 'region') {
        delete item.type
        if (!item.validator) {
          item.validator = (rule, value) => {
            if (value.province || value.city || value.area) {
              return true
            } else {
              return false
            }
          }
        }
        if (!item.message) {
          item.message = '请选择地区'
        }
      }
      if (!item.message) {
        if (item.type === 'array') {
          item.message = '必选'
        } else {
          item.message = '必填'
        }
      }
    }
  })
}

function getValue (val) {
  return typeof val === 'undefined' ? '' : val
}

export default function (fields) {
  const rules = map(item => {
    if (type(item.rule) === 'Object') {
      item.rule = [item.rule]
    }
    if (!Array.isArray(item.rule)) {
      throw new Error('rule is not array or object')
    }
    ruleComplete(item.rule)
    return item.rule
  }, filter(item => item.rule, fields))

  const models = map(item => {
    if (typeof item.value === 'undefined' && typeof item.rule === 'undefined') {
      return getValue(item)
    }
    return getValue(item.value)
  }, fields)

  return { rules, models }
}
