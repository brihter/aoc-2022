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
    'X': 'L', 'Y': 'D', 'Z': 'W'
  }

  return row
    .split(' ')
    .map(i => t[i])
}

const find = ([input, result]) => {
  const output = outcomes[input].indexOf(result)
  return [input, output]
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
  .map(find)
  .map(play)
  .reduce(sum, 0)

console.log(result)
