import Editor from './index'

export default {
  name: 'Tinymce',
  inheritAttrs: false,
  render (h) {
    const listeners = { ...this.$listeners }
    listeners.onChange = (e) => {
      this.$emit('change')
      this.$listeners.onChange && this.$emit('onChange', e)
    }
    listeners.onBlur = () => {
      this.$emit('blur')
      this.$listeners.onBlur && this.$emit('onBlur')
    }
    listeners.onInit = (e) => {
      this.editor = e.target
      this.$listeners.onInit && this.$emit('onInit', e)
    }
    return <Editor
      props={{ ...this.$attrs, ...this.$props }}
      on={listeners}
    />
  },
}
