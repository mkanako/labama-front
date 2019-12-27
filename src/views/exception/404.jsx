import ExceptionPage from './ExceptionPage'

export default {
  name: 'Page404',
  functional: true,
  render () {
    return <ExceptionPage type={404} />
  }
}
