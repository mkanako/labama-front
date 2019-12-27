import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
}

export function AppDeviceEnquire (cb) {
  const matched = type => ({ match: () => cb(type) })
  enquireJs
    .register('screen and (max-width: 576px)', matched(DEVICE_TYPE.MOBILE))
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matched(DEVICE_TYPE.TABLET))
    .register('screen and (min-width: 1200px)', matched(DEVICE_TYPE.DESKTOP))
}
