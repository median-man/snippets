class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  enqueue(value) {
    const newNode = new Node(value)
    if (this.tail) {
      this.tail.next = newNode
      this.tail = newNode
    } else {
      this.head = newNode
      this.tail = newNode
    }
    this.size += 1
    return this.size
  }

  dequeue() {
    if (this.size > 0) {
      const result = this.head.value
      this.head = this.head.next
      this.size -= 1
      return result
    }
  }

  peek() {
    return this.head.value
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
/* 
unitTests()

function unitTests() {
  const tests = [
    {
      message: 'enqueue adds item to empty queue',
      test: () => {
        try {
          const q = new Queue()
          q.enqueue('Seven of Nine')
          return q.size === 1
        } catch (err) {
          // console.log(err)
          return false
        }
      }
    },
    {
      message: 'enqueue returns new size',
      test: () => {
        const q = new Queue()
        q.enqueue('Seven of Nine')
        return q.enqueue('Kes') === 2
      }
    },
    {
      message: 'dequeue returns undefined when queue is empty',
      test: () => {
        const q = new Queue()
        return q.dequeue() === undefined
      }
    },
    {
      message: 'dequeue returns first item added to the list',
      test: () => {
        const q = new Queue()
        q.enqueue('Kathryn Janeway')
        q.enqueue("B'Elanna Torres")
        return q.dequeue() === 'Kathryn Janeway'
      }
    },
    {
      message: 'dequeue updates the size of the list',
      test: () => {
        const q = new Queue()
        q.enqueue('Kathryn Janeway')
        q.enqueue("B'Elanna Torres")
        q.dequeue()
        return q.size === 1
      }
    },
    {
      message: 'dequeue removes items',
      test: () => {
        const q = new Queue()
        q.enqueue('Kathryn Janeway')
        q.enqueue("B'Elanna Torres")
        q.dequeue()
        return q.dequeue() === "B'Elanna Torres"
      }
    },
    {
      message: 'peek returns item at the head',
      test: () => {
        const q = new Queue()
        q.enqueue('Kathryn Janeway')
        q.enqueue("B'Elanna Torres")
        return q.peek() === 'Kathryn Janeway'
      }
    },
    {
      message: 'peek does not remove item',
      test: () => {
        const q = new Queue()
        q.enqueue('Kathryn Janeway')
        q.enqueue("B'Elanna Torres")
        q.peek() === 'Kathryn Janeway'
        return q.dequeue() === 'Kathryn Janeway'
      }
    }
  ]
  tests.forEach(doTest)

  function doTest({ message, test }) {
    const PASS_MARK = '✓'
    const FAIL_MARK = 'X'
    const DEFAULT_COLOR = '\x1b[0m'
    const REVERSE_COLOR = '\x1b[7m'
    if (test()) {
      console.log(PASS_MARK + '   ' + message)
    } else {
      console.log(REVERSE_COLOR + FAIL_MARK + '   ' + message + DEFAULT_COLOR)
    }
  }
}
 */
