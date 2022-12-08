import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

import { rotate, union, fill, sum } from './matrix.js'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const scanRow = (row) => {
  let last = -1

  const max = (acc, value, i) => {
    if (value > last) {
      acc[i] = 1
      last = value
    }
    return acc
  }

  return row.reduce(max, fill(0, row.length))
}

const scan = (matrix) => {
  let result = fill(0, matrix.length, matrix.length)

  fill(0, 4).forEach(() => {
    matrix = rotate(matrix)
    result = rotate(result)
    result = union(result, matrix.map(scanRow))
  })

  return result
}

let matrix = read(input)
  .split('\n')
  .map(x => x.split('').map(Number))

console.log(sum(scan(matrix)))