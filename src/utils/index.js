export function attachmentUrl (src) {
  if (!src) {
    return ''
  }
  if (/^https?:\/\//.test(src)) {
    return src
  }
  return (window.attachmentUrl || '') + src
}
