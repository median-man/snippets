class PriorityQueue {
  constructor() {
    this.nodes = []
  }

  enqueue(value, priority) {
    this.nodes.push(new Node(value, priority))
    this.bubble()
  }

  bubble(index = this.nodes.length - 1) {
    if (index === 0) return 0
    const parentIndex = Math.floor((index - 1) / 2)
    if (this.nodes[parentIndex].priority <= this.nodes[index].priority) {
      return index
    }
    this.swap(index, parentIndex)
    return this.bubble(parentIndex)
  }

  swap(i, j) {
    const temp = this.nodes[i]
    this.nodes[i] = this.nodes[j]
    this.nodes[j] = temp
  }

  dequeue() {
    const result = this.nodes[0]
    const end = this.nodes.pop()
    if (this.nodes.length > 0) {
      this.nodes[0] = end
      this.cascadeDown()
    }
    return result ? result.value : null
  }

  cascadeDown(index = 0) {
    const left = index * 2 + 1
    const right = index * 2 + 2
    const leftNode = left < this.nodes.length ? this.nodes[left] : null
    const rightNode = right < this.nodes.length ? this.nodes[right] : null
    const currentNode = this.nodes[index]

    if (!leftNode && !rightNode) return

    if (
      rightNode &&
      rightNode.priority <= leftNode.priority &&
      rightNode.priority <= currentNode.priority
    ) {
      this.swap(index, right)
      return this.cascadeDown(right)
    }

    if (leftNode.priority <= currentNode.priority) {
      this.swap(index, left)
      return this.cascadeDown(left)
    }
  }
}

class Node {
  constructor(value, priority) {
    this.value = value
    this.priority = priority
  }
}
