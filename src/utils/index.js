export function tomedia (src) {
  if (!src) {
    return ''
  }
  if (/^https?:\/\//.test(src)) {
    return src
  }
  return (window.attachUrl || '') + src
}
