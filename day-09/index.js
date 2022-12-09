import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

import { V, add, distance, serialize, subtract } from './vector.js'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const vectors = {
  U: V(0, 1),
  D: V(0, -1),
  L: V(-1, 0),
  R: V(1, 0)
}

const parse = (row) => {
  let [direction, distance] = row.split(' ')
  distance = Number(distance)
  return Array(distance).fill(vectors[direction])
}

const move = (state, v1) => {
  const head = (v1) => add(state.head, v1)
  const tail = (v1) => {
    const d = distance(state.head, state.tail)
    if (d >= 2) {
      let diff = state.head
      diff = subtract(diff, state.tail)
      diff = subtract(diff, v1)
      state.tail = add(state.tail, diff)
    }

    state.trace.push(state.tail)
    return state.tail
  }

  state.head = head(v1)
  state.tail = tail(v1)

  return state
}

let state = {
  head: V(0, 0),
  tail: V(0, 0),
  trace: [V(0, 0)]
}

state = read(input)
  .split('\n')
  .flatMap(parse)
  .reduce(move, state)

const result = state.trace
  .map(serialize)
  .reduce((acc, v) => acc.add(v), new Set())

console.log(result.size)
