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

const overlap = ([s1, s2]) => {
  const intersect = (a, b) => new Set([...a].filter(x => b.has(x)))
  return intersect(s1,s2).size > 0
}

const sum = (sum, value) => sum + value

// prettier-ignore
const result = read(input)
  .split('\n')
  .map(x => x.split(','))
  .map(x => x.map(expand))
  .map(overlap)
  .reduce(sum, 0)

console.log(result)
