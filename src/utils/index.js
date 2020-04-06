export function attachUrl (src) {
  if (!src) {
    return ''
  }
  if (/^https?:\/\//.test(src)) {
    return src
  }
  return (window.attachUrl || '') + src
}
