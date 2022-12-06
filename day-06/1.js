import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const read = input => readFileSync(input, { encoding: 'ascii' })

const stream = read(input)
  .split('\n')
  .pop()
  .split('')

let i = 0
const bufferSize = 4
const buffer = []
while (i < stream.length) {
  const c = stream[i]
  buffer.push(c)
  if (buffer.length === bufferSize+1) {
    buffer.shift()
  }

  ++i

  const set = new Set(buffer)
  if (set.size === bufferSize) {
    break
  }
}

console.log(i)
