import ExceptionPage from './ExceptionPage'

export default {
  name: 'Page403',
  functional: true,
  render () {
    return <ExceptionPage type={403} />
  }
}
