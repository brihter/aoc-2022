import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const read = input => readFileSync(input, { encoding: 'ascii' })

const toStack = (file) => {
  const raw = file
    .split('\n')
    .filter(l => !l.startsWith('move'))
    .filter(l => l.length > 0)
    .reverse()

  const header = raw
    .filter((l, index) => index === 0)
    .pop()

  const stack = header
    .split(' ')
    .filter(l => l.length > 0)
    .map(x => [])

  const parse = (stack, l) => {
    for (let i = 0; i < stack.length; ++i) {
      const crate = l.substring(i*4+1, i*4+2).trim()
      if (crate.length === 0) continue
      stack[i].push(crate)
    }
    return stack
  }

  return raw
    .filter((l, index) => index > 0)
    .reduce(parse, stack)
}

const move = (stack, op) => {
  const [,quantity,from,to] = [...op.matchAll(/move (\d+) from (\d+) to (\d+)/g)].pop()

  const mod = []
  for(let i=0; i<quantity;i++) {
    mod.push(stack[from-1].pop())
  }

  // just reverse to modifications to preserve the order on move
  mod.reverse()

  for(let i=0; i<quantity;i++) {
    stack[to-1].push(mod[i])
  }

  return stack
}

const tail = (items) => items[items.length-1]

const file = read(input)
const stack = toStack(file)
const result = file
  .split('\n')
  .filter(l => l.startsWith('move'))
  .reduce(move, stack)
  .map(tail)
  .join('')

  console.log(result)
  