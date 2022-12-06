import { argv } from 'node:process'
import { readFileSync } from 'node:fs'
import range from 'lodash/range.js'

const [_, __, input] = argv

const read = input => readFileSync(input, { encoding: 'ascii' })

const expand = (line) => {
  const [from, to] = line
    .split('-')
    .map(x => parseInt(x))

  return new Set(range(from, to+1))
}

const subset = ([s1, s2]) => {
  const isSubset = (s1,s2) => [...s1].every(x => [...s2].includes(x))
  
  const r1 = isSubset(s1, s2)
  const r2 = isSubset(s2, s1)
  return r1 || r2 ? 1 : 0
}

const sum = (sum, value) => sum + value

// prettier-ignore
const result = read(input)
  .split('\n')
  .map(x => x.split(','))
  .map(x => x.map(expand))
  .map(subset)
  .reduce(sum, 0)

console.log(result)
