class LinkedList {
  constructor(head = null) {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(value) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
    } else {
      this.tail.next = node
    }
    this.tail = node
    this.length += 1
    return this
  }

  pop() {
    if (!this.head) return null
    if (!this.head.next) return this.shift()

    let newTail = this.head
    let current = newTail
    while (current.next) {
      newTail = current
      current = current.next
    }
    this.tail = newTail
    this.tail.next = null
    this.length -= 1
    return current
  }

  shift() {
    const result = this.head
    this.head = this.head ? this.head.next : null
    this.length -= 1
    if (!this.head) this.tail = null
    return result
  }

  unshift(value) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.length += 1
    return this
  }

  nodeAt(index) {
    if (this.indexOutOfBounds(index)) return null
    let result = this.head
    for (let currentIndex = 0; currentIndex < index; currentIndex += 1) {
      result = result.next
    }
    return result
  }

  setValueAt(index, value) {
    const node = this.nodeAt(index)
    if (node) {
      node.value = value
      return true
    }
    return false
  }

  insertAt(index, value) {
    if (this.indexOutOfBounds()) return false
    if (index === 0) {
      this.unshift(value)
      return true
    }
    const previousNode = this.nodeAt(index - 1)
    previousNode.next = new Node(value, this.nodeAt(index))
    this.length += 1
    return true
  }

  removeAt(index) {
    if (this.indexOutOfBounds(index)) return null
    if (index === this.length - 1) return this.pop()
    if (index === 0) return this.shift()
    const previous = this.nodeAt(index - 1)
    const result = previous.next
    previous.next = result.next
    this.length -= 1
    return result
  }

  indexOutOfBounds(index) {
    return index < 0 || index >= this.length
  }

  reverse() {
    if (this.length < 2) return this
    let current = this.head
    let previous = null
    while (current) {
      const temp = current.next
      current.next = previous
      previous = current
      current = temp
    }
    this.tail = this.head
    this.head = previous
    return this
  }

  forEach(cb) {
    let current = this.head
    while (current) {
      cb(current)
      current = current.next
    }
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value
    this.next = next
  }
}
