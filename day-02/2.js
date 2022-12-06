import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const outcomes = [
  ['D', 'W', 'L'],
  ['L', 'D', 'W'],
  ['W', 'L', 'D']
]

const scores = { L: 0, D: 3, W: 6 }

const read = input => readFileSync(input, { encoding: 'ascii' })

const parse = row => {
  const t = {
    A: 0,
    B: 1,
    C: 2,
    X: 'L',
    Y: 'D',
    Z: 'W'
  }

  return row.split(' ').map(i => t[i])
}

const find = ([input, result]) => {
  const output = outcomes[input].indexOf(result)
  return [input, output]
}

const play = ([a, b]) => {
  const outcome = outcomes[a][b]
  return b + 1 + scores[outcome]
}

const sum = (sum, value) => sum + value

const result = read(input)
  .split('\n')
  .map(parse)
  .map(find)
  .map(play)
  .reduce(sum, 0)

console.log(result)
