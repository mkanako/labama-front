import provincesData from './provinces-data'

export default Object.keys(provincesData).map(code => ({ code, name: provincesData[code] }))
