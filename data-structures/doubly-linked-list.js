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

// let list = new DoublyLinkedList()

// push and forEach example
// list.push(1)
// console.log(list.head) // Node { value: 1, next: null, previous: null }
// console.log(list.tail) // Node { value: 1, next: null, previous: null }
// console.log(list.length) // 1
// list.push(2).push(3)
// list.forEach(console.log) // prints all 3 node objects (values 1, 2, 3)

// pop examples
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

// shift examples
// ;(function shiftDemo() {
//   withNothingInList()
//   withOneNode()
//   withMoreThanOneNode()

//   function printExampleTitle(title) {
//     console.log('\n')
//     console.log(`${title}:`)
//     console.log('-'.repeat(title.length + 1))
//   }

//   function withNothingInList() {
//     printExampleTitle('Shift with nothing in the list')
//     const list = new DoublyLinkedList()
//     console.log('- returns null?', list.shift() === null) // true
//   }

//   function withOneNode() {
//     printExampleTitle('Shift with one node in the list')
//     const list = new DoublyLinkedList()
//     list.push(1)
//     console.log('- returns node:', list.shift()) // Node { value: 1, next: null, previous: null }
//     console.log('- list:', list) // DoublyLinkedList { head: null, tail: null, length: 0 }
//   }

//   function withMoreThanOneNode() {
//     printExampleTitle('Shift with 3 items in the list')
//     const list = new DoublyLinkedList()
//     list.push(1).push(2).push(3)
//     const expectedNode = list.head
//     console.log('- returns head node?', list.shift() === expectedNode) // true
//     console.log('- list.length = 2?', list.length === 2) // true
//     console.log('- removed node.next is null?', list.shift().next === null) // true
//     console.log('- updates list.head?', list.head.value === 3)
//     console.log('- list.head.previous is null?', list.head.previous === null) // true
//   }
// })()

// ;(function unshiftDemo() {
//   createsANewNodeAtTheHead()

//   function printExampleTitle(title) {
//     console.log('\n')
//     console.log(`${title}:`)
//     console.log('-'.repeat(title.length + 1))
//   }

//   function createsANewNodeAtTheHead() {
//     printExampleTitle('Adds nodes to the beginning of the list')
//     const list = new DoublyLinkedList()
//     list.unshift('foo')
//     console.log(
//       '- updates tail and head when list is empty?',
//       list.head.value === 'foo' && list.tail === list.head
//     )
//     list.unshift('bar').unshift('fizz')
//     console.log('- can be chained (returns `this`)? true')
//     console.log('- updates the length?', list.length === 3)
//     console.log('- adds nodes at the head?', list.head.value === 'fizz')
//     console.log(
//       '- head points to the former head?',
//       list.head.next.value === 'bar'
//     )
//   }
// })()

// ;(function getDemo() {
//   whenIndexIsOutOfBounds()
//   returnsNodeAtGivenIndex()

//   function printExampleTitle(title) {
//     console.log('\n')
//     console.log(`${title}:`)
//     console.log('-'.repeat(title.length + 1))
//   }

//   function whenIndexIsOutOfBounds() {
//     printExampleTitle('When the list is empty:')
//     const list = new DoublyLinkedList()
//     list.push('foo')
//     console.log('- returns null when index < 0?', list.get(-1) === null)
//     console.log('- returns null when index >= length?', list.get(1) === null)
//   }

//   function returnsNodeAtGivenIndex() {
//     printExampleTitle('Returns the node at the given index:')
//     const list = new DoublyLinkedList()
//     list
//       .push('foo')
//       .push('bar')
//       .push('baz')
//     console.log(
//       '- returns the head node when given 0?',
//       list.head === list.get(0)
//     )
//     console.log('- returns node at index 2?', list.get(2).value === 'baz')
//   }
// })()
