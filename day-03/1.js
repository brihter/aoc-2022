import { argv } from 'node:process'
import { readFileSync } from 'node:fs'

const [_, __, input] = argv

const read = input => readFileSync(input, { encoding: 'ascii' })

const group = (line) => {
  const m = line.length/2
  const s1 = new Set(line.substr(0, m))
  const s2 = new Set(line.substr(m))
  return [...s1].filter(x => s2.has(x)).pop()
}

const score = (item) => {
  const isLowercase = (item) => item.match(/[a-z]/) !== null

  const code = item.charCodeAt(0)
  return isLowercase(item) ? code - 96 : code - 38
}

const sum = (sum, value) => sum + value

// prettier-ignore
const result = read(input)
  .split('\n')
  .map(group)
  .map(score)
  .reduce(sum, 0)

console.log(result)
