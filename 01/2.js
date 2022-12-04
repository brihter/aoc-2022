import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const read = input => {
  return readFileSync(input, { encoding: 'ascii' })
}

const parse = i => {
  return i.length > 0 ? parseInt(i) : i
}

const aggregate = (acc, curr) => {
  if (curr === '') {
    acc.max.push(acc.sum)
    acc.sum = 0
    return acc
  }

  acc.sum += curr
  return acc
}

// prettier-ignore
const sums = read(input)
  .split('\n')
  .map(parse)
  .reduce(aggregate, { max: [], sum: 0 })

// prettier-ignore
const result = sums.max
  .sort((a, b) => (a > b ? -1 : 1))
  .slice(0, 3)
  .reduce((acc, curr) => {
    acc += curr
    return acc
  }, 0)

console.log(result)
