class Stack {
  constructor() {
    this.head = null
    this.size = 0
  }

  push(value) {
    const node = new Node(value)
    node.next = this.head
    this.head = node
    this.size += 1
    return this.size
  }

  pop() {
    if (this.head) {
      const result = this.head.value
      this.head = this.head.next
      this.size -= 1
      return result
    }
  }

  peek() {
    return this.head.value
  }

  clear() {
    this.head = null
    this.size = 0
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

testStack()
function testStack() {
  console.log('push:')
  console.log('-----')
  pushTests()

  console.log('\npop:')
  console.log('----')
  popTests()

  console.log('\npeek:')
  console.log('-----')
  peekTests()

  function doTest(message, test) {
    const PASS_MARK = '✓'
    const FAIL_MARK = 'X'
    const mark = test() ? PASS_MARK : FAIL_MARK
    console.log(mark + '   ' + message)
  }

  function pushTests() {
    const tests = [
      {
        message: 'Does not throw when list is empty',
        test: () => {
          const stack = new Stack()
          try {
            stack.push('Spock')
            return true
          } catch (error) {
            isTestPassed = false
            console.log(error)
            return false
          }
        }
      },
      {
        message: 'Updates list size',
        test: () => {
          const stack = new Stack()
          stack.push('Spock')
          return stack.size === 1
        }
      },
      {
        message: 'Returns new list size',
        test: () => {
          const stack = new Stack()
          stack.push('Spock')
          return stack.push('Bones') === 2
        }
      }
    ]
    tests.forEach(({ message, test }) => doTest(message, test))
  }

  function popTests() {
    const tests = [
      {
        message: 'Returns newest value',
        test: () => {
          const stack = new Stack()
          stack.push('Jean-Luc Picard')
          stack.push('James Kirk')
          return stack.pop() === 'James Kirk'
        }
      },
      {
        message: 'Returns undefined when list is empty',
        test: () => {
          const stack = new Stack()
          return stack.pop() === undefined
        }
      },
      {
        message: 'Updates size',
        test: () => {
          const stack = new Stack()
          stack.push('Data')
          stack.push('Worf')
          stack.pop()
          return stack.size === 1
        }
      }
    ]
    tests.forEach(({ message, test }) => doTest(message, test))
  }

  function peekTests() {
    const tests = [
      {
        message: 'Returns newest value',
        test: () => {
          const stack = new Stack()
          stack.push('William Riker')
          return stack.peek() === 'William Riker'
        }
      },
      {
        message: 'Does not remove the value',
        test: () => {
          const stack = new Stack()
          stack.push('Spock')
          stack.peek()
          return stack.pop() === 'Spock'
        }
      }
    ]
    tests.forEach(({ message, test }) => doTest(message, test))
  }
}
