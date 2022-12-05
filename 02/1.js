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

const parse = (row) => {
  const t = {
    'A': 0, 'B': 1, 'C': 2,
    'X': 0, 'Y': 1, 'Z': 2
  }

  return row.split(' ').map(i => t[i])
}

const play = ([a, b]) => {
  const outcome = outcomes[a][b]
  return b + 1 + scores[outcome]
}

const sum = (sum, item) => sum + item

const result = read(input)
  .split('\n')
  .map(parse)
  .map(play)
  .reduce(sum, 0)

console.log(result)
