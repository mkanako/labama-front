import { pick, omit } from 'ramda'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import './zh_CN' // https://www.tiny.cloud/get-tiny/language-packages/
import plugins from './plugins'
import Editor from '@tinymce/tinymce-vue'
import { editorProps } from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes'
import Uploader from '@/components/MediaInput/Uploader'
import { attachmentUrl } from '@/utils'
import contentUrl from '!file-loader?{"name":"css/tinymce_content.[hash:8].css"}!extract-loader!css-loader?{"importLoaders":2,"sourceMap":false}!postcss-loader?{"sourceMap":false}!less-loader?{"sourceMap":false}!./content.less' // eslint-disable-line import/no-webpack-loader-syntax

const toolbar = [
  'bold italic underline strikethrough subscript superscript blockquote removeformat | bullist numlist | alignleft aligncenter alignright alignjustify alignnone | outdent indent | code',
  'undo redo | formatselect fontselect fontsizeselect forecolor backcolor | imageUploader',
]

Editor.name = 'TinymceVue'
window.tinymce.addI18n('zh_CN', {
  'Formats': '样式',
  'No alignment': '清除对齐方式',
  'Redo': '恢复',
  'Open Link': '打开链接',
})

const init = {
  language: 'zh_CN',
  content_css: contentUrl,
  skin: false,
  toolbar,
  plugins,
  menubar: 'edit view insert table format',
  height: 200,
  max_height: 600,
  branding: false,
  custom_undo_redo_levels: 10,
  nonbreaking_force_tab: true,
  default_link_target: '_blank',
  link_title: false,
  image_description: false,
  image_advtab: true,
  style_formats: [
    {
      title: '图片铺满',
      selector: 'img',
      attributes: {
        width: '',
        height: '',
      },
      styles: {
        width: '100%',
      },
    },
  ],
  setup: editor => {
    editor.ui.registry.addButton('imageUploader', {
      text: '',
      tooltip: '图片上传&选择',
      icon: 'image',
      onAction () {
        Uploader(ret => {
          if (ret) {
            editor.focus()
            editor.selection.setContent(`<img src="${attachmentUrl(ret)}" />`)
            editor.save()
          }
        })
      },
    })
  },
}

export default {
  functional: true,
  render (h, context) {
    const props = pick(Object.keys(editorProps), context.props)
    if (!props.init) {
      const otherProps = omit(Object.keys(props), context.props)
      props.init = Object.assign({}, init, otherProps)
    }
    return <div
      class={['tinymce-container', context.data.class, context.data.staticClass]}
      style={[context.data.style, context.data.staticStyle]}
    >
      <Editor
        ref={context.data.ref}
        props={props}
        on={context.listeners}
      />
    </div>
  },
}
