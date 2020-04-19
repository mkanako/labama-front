import provincesData from './provinces-data'
import citesData from './cites-data'
import areasData from './areas-data'

const cites = Object.assign({}, citesData)

Object.keys(citesData).forEach(code => {
  const name = citesData[code]
  cites[code] = { name, code, children: [] }
})

Object.keys(areasData).forEach(acode => {
  const ccode = `${acode.slice(0, 4)}00`
  if (cites[ccode]) {
    cites[ccode].children.push({ code: acode, name: areasData[acode] })
  }
})

const provinces = Object.assign({}, provincesData)

Object.keys(provincesData).forEach(code => {
  const name = provincesData[code]
  provinces[code] = { name, code, children: [] }
})

Object.keys(cites).forEach(ccode => {
  const pcode = `${ccode.slice(0, 2)}0000`
  if (provinces[pcode]) {
    provinces[pcode].children.push(cites[ccode])
  }
})

export default Object.keys(provinces).map(code => provinces[code])
