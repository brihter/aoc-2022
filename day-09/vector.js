import * as math from 'mathjs'

const V = math.complex
const add = math.add
const subtract = math.subtract
const distance = (v1,v2) => math.distance(v1.toVector(), v2.toVector())
const serialize = (v) => `${v.re},${v.im}`

export {
  V,
  add,
  subtract,
  distance,
  serialize
}
