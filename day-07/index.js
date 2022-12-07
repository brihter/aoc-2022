import { argv } from 'node:process'
import { readFileSync } from 'node:fs'
import { Graph } from './graph.js'

const [_, __, input] = argv
const read = input => readFileSync(input, { encoding: 'ascii' })

const parse = (op) => {
  const [
    prefix,
    key,
    param
  ] = op.split(' ')

  const ops = []
  if (prefix !== '$') {
    ops.push({
      cmd: 'mk',
      type: 'file',
      key,
      size: parseInt(prefix)
    })
  }

  if (op.startsWith('$ cd')) {
    if (param !== '..') {
      ops.push({
        cmd: 'mk',
        type: 'dir',
        key: param
      })
    }

    ops.push({
      cmd: 'cd',
      type: 'dir',
      key: param
    })
  }

  return ops
}

const build = (acc, op) => {
  const toKey = (parts) => parts.join('/').replace('//', '/')

  if (op.cmd === 'mk') {
    acc.graph.add({
      key: toKey([...acc.path, op.key]),
      parent: toKey(acc.path),
      type: op.type,
      size: op.size || 0
    })
  }

  if (op.cmd === 'cd') {
    if (op.key === '..') acc.path.pop()
    else acc.path.push(op.key)
  }

  return acc
}

const { graph } = read(input)
  .split('\n')
  .filter(l => !l.startsWith('dir'))
  .filter(l => !l.startsWith('$ ls'))
  .flatMap(parse)
  .reduce(build, { graph: Graph(), path: [] })

const part1 = () => {
  let sum = 0
  graph.traverseDown('/', (key, attr) => {
    if (attr.size <= 100000 && attr.type === 'dir') {
      sum += attr.size
    }
  })
  console.log(sum)
}

const part2 = () => {
  const root = graph.get('/')

  const diskCapacity = 70000000
  const diskRequired = 30000000
  const diskAvailable = diskCapacity - root.attributes.size

  let smallest = undefined
  let smallestPtr = undefined
  graph.traverseDown('/', (key, attr) => {
    if (attr.type === 'dir') {
      const space = diskAvailable + attr.size
      if (space < diskRequired) return
      if (!smallest || space < smallest) {
        smallest = space
        smallestPtr = key
      }
    }
  })

  const path = graph.get(smallestPtr)
  console.log(path.attributes.size)
}

part1()
part2()
