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

// let list = new DoublyLinkedList()

// push and forEach example
// list.push(1)
// console.log(list.head) // Node { value: 1, next: null, previous: null }
// console.log(list.tail) // Node { value: 1, next: null, previous: null }
// console.log(list.length) // 1
// list.push(2).push(3)
// list.forEach(console.log) // prints all 3 node objects (values 1, 2, 3)

// list = new DoublyLinkedList()
// console.log(list.pop()) // null
// list.push(1)
// console.log(list.pop()) // Node { value: 1, next: null, previous: null }
// console.log(list.length, list.head, list.tail) // 0 null null
// list.push(1).push(2)
// console.log(list.pop()) // Node { value: 2, next: null, previous: null }
// console.log(list.length === 1) // true
// console.log(list.tail === list.head) // true
// list.forEach(console.log) // Node { value: 1, next: null, previous: null }