class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new Node(value)
    if (!this.root) {
      this.root = newNode
      return
    }

    addNode(this.root)

    function addNode(currentNode) {
      if (value === currentNode.value) return
      const next = value < currentNode.value ? 'left' : 'right'
      if (!currentNode[next]) {
        currentNode[next] = newNode
        return
      }
      addNode(currentNode[next])
    }
  }

  search(value, currentNode = this.root) {
    if (!currentNode) return null
    if (currentNode.value === value) return currentNode
    const next = value < currentNode.value ? 'left' : 'right'
    return this.search(value, currentNode[next])
  }

  // should use a queue instead of an array for better performance
  traverseBreadthFirst(fn, queue = [this.root]) {
    if (!queue.length) return
    const currentNode = queue.shift()
    if (!currentNode) return this.traverseBreadthFirst(fn, queue)
    queue.push(currentNode.left, currentNode.right)
    fn(currentNode)
    this.traverseBreadthFirst(fn, queue)
  }

  traverseDepthFirstPreOrder(fn, currentNode = this.root) {
    if (!currentNode) return
    fn(currentNode)
    this.traverseDepthFirstPreOrder(fn, currentNode.left)
    this.traverseDepthFirstPreOrder(fn, currentNode.right)
  }

  traverseDepthFirstPostOrder(fn, currentNode = this.root) {
    if (!currentNode) return
    this.traverseDepthFirstPostOrder(fn, currentNode.left)
    this.traverseDepthFirstPostOrder(fn, currentNode.right)
    fn(currentNode)
  }

  traverseInOrder(fn, currentNode = this.root) {
    if (!currentNode) return
    this.traverseInOrder(fn, currentNode.left)
    fn(currentNode)
    this.traverseInOrder(fn, currentNode.right)
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
