import Vue from 'vue'
import { Modal } from 'ant-design-vue'
import './style.less'

export default function (option = {}) {
  const data = Vue.observable({
    value: option.initVal || '',
  })
  const handleChange = e => {
    const { value } = e.target
    data.value = value
  }
  return new Promise((resolve, reject) => {
    Modal.confirm(Object.assign(option, {
      class: 'modal-prompt',
      parentContext: this,
      content: h => <a-input {...{
        props: data,
        on: { change: handleChange },
        attrs: { spellcheck: false },
      }} />,
      onOk () {
        resolve(data.value)
      },
      onCancel () {
        reject(Error('onCancel'))
      },
    }))
  })
}
