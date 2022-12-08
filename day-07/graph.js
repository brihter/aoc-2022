import graphology from 'graphology'
import { bfsFromNode } from 'graphology-traversal/bfs.js'

const Graph = () => {
  const g = new graphology.Graph()

  const traverseUp = (key, fn) => bfsFromNode(g, key, fn, { mode: 'inbound' })

  const traverseDown = (key, fn) => bfsFromNode(g, key, fn, { mode: 'outbound' })
  
  const traverse = (key, fn) => {
    const results = []
    bfsFromNode(g, key, (key, attr) => {
      results.push(fn(key, attr))
    }, { mode: 'outbound' })
    return results
  }

  const update = (node) => {
    g.updateNode(node.key, attr => ({
      ...attr,
      type: (typeof node.type === 'undefined') ? attr.type : node.type,
      size: (typeof node.size === 'undefined') ? attr.size : node.size
    }))
  }
  
  const add = (node) => {
    update(node)
  
    if (node.parent && !g.hasEdge(node.parent, node.key)) {
      g.addEdge(node.parent, node.key)
    }
  
    if (node.size > 0) {
      traverseUp(node.key, (key, attr) => {
        if (node.key === key) return
        update({ key, size: attr.size + node.size })
      })
    }
  }

  const get = (nodeKey) => g._nodes.get(nodeKey)

  return {
    add,
    update,
    get,
    traverse,
    traverseUp,
    traverseDown
  }
}

export { Graph }
