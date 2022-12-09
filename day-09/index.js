import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

import { V, add, unit, distance, serialize, subtract } from './vector.js'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const vectors = {
  U: (d) => V(0, d),
  D: (d) => V(0, -d),
  L: (d) => V(-d, 0),
  R: (d) => V(d, 0)
}

const parse = (row) => {
  const [direction, distance] = row.split(' ')
  return vectors[direction](Number(distance))
}

const move = (state, v1) => {
  const head = (v1) => add(state.head, v1)
  const tail = (v1) => {
    const d = distance(state.head, state.tail)
    if (d === 2) state.tail = add(state.tail, v1)
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
  .map(parse)
  .flatMap(unit)
  .reduce(move, state)

const result = state.trace
  .map(serialize)
  .reduce((acc, v) => acc.add(v), new Set())

console.log(result.size)
