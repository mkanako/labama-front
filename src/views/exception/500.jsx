import ExceptionPage from './ExceptionPage'

export default {
  name: 'Page500',
  functional: true,
  render () {
    return <ExceptionPage type={500} />
  }
}
