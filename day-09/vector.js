import * as math from 'mathjs'

const V = math.complex

const add = math.add

const subtract = math.subtract

const unit = (v) => {
  v = v.toVector()

  const p = v[0] === 0 ? 1 : 0
  const sign = v[p] > 0 ? 1 : -1
  const l = Math.abs(v[p])

  const result = []
  for (let i=0; i<l; ++i) {
    let r = [0,0]
    r[p] = sign
    result.push(V(r[0], r[1]))
  }
  
  return result
}

const distance = (v1,v2) => {
  return math.distance(v1.toVector(), v2.toVector())
}

const serialize = (v) => `${v.re},${v.im}`

export {
  V,
  add,
  subtract,
  unit,
  distance,
  serialize
}
