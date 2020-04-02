import { map } from 'ramda'

export function attachUrl (src) {
  if (!src) {
    return ''
  }
  if (/^https?:\/\//.test(src)) {
    return src
  }
  return (window.attachUrl || '') + src
}

export function genFormProps (fields) {
  function ruleNormalized (r) {
    if (!r) {
      return
    }
    if (!r.trigger) {
      r.trigger = 'change'
    }
    if (r.required === true && !r.message) {
      if (r.type === 'array') {
        r.message = '必选'
      } else {
        r.message = '必填'
      }
    }
  }
  const rules = map(item => {
    if (Array.isArray(item.rule)) {
      item.rule.forEach(elem => {
        ruleNormalized(elem)
      })
    } else {
      ruleNormalized(item.rule)
    }
    return item.rule
  }, fields)
  const models = map(item => item.value, fields)
  return { rules, models }
}
