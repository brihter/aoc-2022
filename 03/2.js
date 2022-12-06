import { argv } from 'node:process'
import { readFileSync } from 'node:fs'
import _ from 'lodash'

const [, , input] = argv

const read = input => readFileSync(input, { encoding: 'ascii' })

const group = (items) => {
  const intersect = (a, b) => new Set([...a].filter(x => b.has(x)))

  const sets = items.reduce((acc, line) => {
    acc.push(new Set(line))
    return acc
  }, [])

  const intersection = sets.reduce((acc, set) => intersect(acc, set), sets[0])

  return [...intersection].pop()
}

const score = (item) => {
  const isLowercase = (item) => item.match(/[a-z]/) !== null
  const code = item.charCodeAt(0)
  return isLowercase(item) ? code - 96 : code - 38
}

const sum = (sum, value) => sum + value

let result

// prettier-ignore
result = read(input)
  .split('\n')

// prettier-ignore
result = _.chunk(result, 3)
  .map(group)
  .map(score)
  .reduce(sum, 0)

console.log(result)
