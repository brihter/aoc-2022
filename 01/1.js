import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const read = input => {
  return readFileSync(input, { encoding: 'ascii' })
}

const parse = chunk => {
  return chunk
    .split('\n')
    .filter(i => i.length > 0)
    .map(i => parseInt(i))
}

const sum = (items) => {
  return items.reduce((sum, item) => sum + item, 0)
}

const result = read(input)
  .split('\n\n')
  .map(parse)
  .map(sum)

console.log(Math.max(...result))
