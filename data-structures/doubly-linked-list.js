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

const list = new DoublyLinkedList()

// push and forEach example
// list.push(1)
// console.log(list.head) // Node { value: 1, next: null, previous: null }
// console.log(list.tail) // Node { value: 1, next: null, previous: null }
// console.log(list.length) // 1
// list.push(2).push(3)
// list.forEach(console.log) // prints all 3 node objects (values 1, 2, 3)
