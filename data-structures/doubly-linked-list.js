class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(value) {
    const node = new Node(value)
    if (!this.tail) {
      this.head = node
      this.tail = node
    } else {
      node.previous = this.tail
      this.tail.next = node
      this.tail = node
    }
    this.length += 1
    return this
  }

  pop() {
    if (!this.tail) return null
    const node = this.tail
    this.tail = node.previous
    node.previous = null
    this.length -= 1
    if (this.length === 0) {
      this.head = null
    } else {
      this.tail.next = null
    }
    return node
  }

  shift() {
    if (!this.head) return null
    if (this.length === 1) return this.pop()
    const removedNode = this.head
    this.head = removedNode.next
    this.head.previous = null
    removedNode.next = null
    this.length -= 1
    return removedNode
  }

  unshift(value) {
    if (this.length === 0) return this.push(value)
    const newNode = new Node(value)
    newNode.next = this.head
    this.head.previous = newNode
    this.head = newNode
    this.length += 1
    return this
  }

  get(index) {
    const { head, tail, length } = this
    if (index < 0 || index >= length) return null
    const mid = length / 2
    return index < mid ? searchFromHead() : searchFromTail()

    function searchFromHead() {
      let result = head
      for (let i = 0; i < index; i += 1) {
        result = result.next
      }
      return result
    }

    function searchFromTail() {
      let result = tail
      for (let i = length - 1; i > index; i -= 1) {
        result = result.previous
      }
      return result
    }
  }

  set(index, value) {
    const node = this.get(index)
    if (node) {
      node.value = value
      return true
    }
    return false
  }

  insert(index, value) {
    if (index === 0) {
      this.unshift(value)
      return true
    }
    if (index === this.length) {
      this.push(value)
      return true
    }
    const nextNode = this.get(index)
    if (nextNode) {
      const newNode = new Node(value)
      const prevNode = nextNode.previous
      newNode.previous = prevNode
      newNode.next = nextNode

      prevNode.next = newNode
      nextNode.previous = newNode
      this.length += 1
      return true
    }
    return false
  }

  remove(index) {
    if (index === 0) return this.shift()
    if (index === this.length - 1) return this.pop()
    const removedNode = this.get(index)
    if (removedNode) {
      const { previous, next } = removedNode
      removedNode.previous = null
      removedNode.next = null
      previous.next = next
      next.previous = previous
      this.length -= 1
    }
    return removedNode
  }

  forEach(cb) {
    let current = this.head
    while (current) {
      cb(current)
      current = current.next
    }
    return this
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.previous = null
  }
}
