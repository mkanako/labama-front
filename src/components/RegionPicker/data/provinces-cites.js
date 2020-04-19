import provincesData from './provinces-data'
import citesData from './cites-data'

const provinces = Object.assign({}, provincesData)

Object.keys(provincesData).forEach(code => {
  const name = provincesData[code]
  provinces[code] = { name, code, children: [] }
})

Object.keys(citesData).forEach(ccode => {
  const pcode = `${ccode.slice(0, 2)}0000`
  if (provinces[pcode]) {
    provinces[pcode].children.push({ code: ccode, name: citesData[ccode] })
  }
})

export default Object.keys(provinces).map(code => provinces[code])
