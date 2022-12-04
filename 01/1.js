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
    if (acc.sum > acc.max) {
      acc.max = acc.sum
    }
    acc.sum = 0
    return acc
  }

  acc.sum += curr
  return acc
}

// prettier-ignore
const result = read(input)
  .split('\n')
  .map(parse)
  .reduce(aggregate, { max: 0, sum: 0 })

console.log(result.max)
