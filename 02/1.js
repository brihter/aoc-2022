import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

// generate all possible outcomes of rps x rps (rps = rock, paper, scissors)
const outcomes = [
  ['D', 'W', 'L'],
  ['L', 'D', 'W'],
  ['W', 'L', 'D']
]

const scores = {
  L: 0,
  D: 3,
  W: 6
}

const read = input => {
  return readFileSync(input, { encoding: 'ascii' })
}

const parse = (row) => {
  // transform letters to indexes
  const t = {
    'A': 0, 'B': 1, 'C': 2,
    'X': 0, 'Y': 1, 'Z': 2
  }

  return row.split(' ').map(i => t[i])
}

const play = ([input, output]) => {
  const outcome = outcomes[input][output]

  let score = 0
  score += output + 1 // add item score; fn(score) = item_index + 1
  score += scores[outcome] // add outcome score
  return score
}

const sum = (sum, item) => sum + item

const result = read(input)
  .split('\n')
  .map(parse)
  .map(play)
  .reduce(sum, 0)

console.log(result)
