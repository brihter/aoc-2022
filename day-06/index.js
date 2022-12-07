import { argv } from 'node:process'
import { readFileSync } from 'node:fs'
import CircularBuffer from 'mnemonist/circular-buffer.js'

const [_, __, input, capacity] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const process = (buffer, c, i, iterator) => {
  buffer.push(c)
  if (new Set(buffer.toArray()).size === buffer.capacity) {
    iterator.splice(1) // early return
    return i+1
  }
  return buffer
}

const result = read(input)
  .split('\n')
  .pop()
  .split('')
  .reduce(process, new CircularBuffer(Array, parseInt(capacity)))

console.log(result)