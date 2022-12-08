import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

import { rotate, union, fill, sum } from './matrix.js'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const scanRow = (row) => {
  const { items } = row.reduce((acc, value, i) => {
    if (value > acc.max) {
      acc.max = value
      acc.items[i] = 1
    }
    return acc
  }, { max: -1, items: new Array(row.length).fill(0) })
  return items
}

const scan = (matrix) => {
  let result = fill(matrix.length, matrix.length, 0)

  new Array(4).fill(0).forEach(() => {
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
