import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const parse = (str) => {
  let [ins, val] = str.split(' ')
  if (ins === 'noop') return [false]
  if (ins === 'addx') return [false, { ins, val: Number(val) }]
}

const execute = (state, op, cycle) => {
  state.trace[cycle + 1] = (cycle + 1) * state.registers.x
  if (op?.ins === 'addx') state.registers.x += op.val
  return state
}

const sum = (sum, item) => sum + item

const state = read(input)
  .split('\n')
  .flatMap(parse)
  .reduce(execute, {
    registers: { x: 1 },
    trace: [0]
  })

const result = state.trace
  .filter((v, cycle) => cycle % 40 === 20) // 20, 40, 80, ...
  .reduce(sum, 0)

console.log(result)