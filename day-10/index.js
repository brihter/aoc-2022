import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [, , input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const parse = (str) => {
  let [ins, val] = str.split(' ')
  if (ins === 'noop') return [false]
  if (ins === 'addx') return [false, { ins, val: Number(val) }]
}

const execute = (state, op, i) => {
  // during exec
  const x = state.registers.x
  const c = ([x-1,x,x+1].includes(i%40)) ? '#' : '.'
  state.trace[i+1] = (i+1)*state.registers.x
  state.buffer += c

  // post exec
  if (op?.ins === 'addx') state.registers.x += op.val
  return state
}

const sum = (sum, item) => sum + item

const state = read(input)
  .split('\n')
  .flatMap(parse)
  .reduce(execute, {
    registers: { x: 1 },
    trace: [0],
    buffer: ''
  })

const result1 = state.trace
  .filter((v, cycle) => cycle % 40 === 20) // 20, 40, 80, ...
  .reduce(sum, 0)

console.log(result1)

const result2 = state.buffer
  .split('')
  .map((c, i) => (i+1)%40===0 ? c+'\n' : c) // 40 chars per line
  .join('')

console.log(result2)