/* 
  Slow implementation using array and sorting for each enqueue call - O(nlogn)
*/
class PriorityQueue {
  constructor() {
    this.elements = []
  }
  enqueue(value, priority) {
    this.elements.push(new Element(value, priority))
    this._bubble()
  }
  _bubble(index = this.elements.length - 1) {
    if (index === 0) return 0
    const parentIndex = Math.floor((index - 1) / 2)
    if (this.elements[parentIndex].priority <= this.elements[index].priority) {
      return index
    }
    this._swap(index, parentIndex)
    return this._bubble(parentIndex)
  }
  _swap(i, j) {
    const temp = this.elements[i]
    this.elements[i] = this.elements[j]
    this.elements[j] = temp
  }
  dequeue() {
    const result = this.elements[0]
    const end = this.elements.pop()
    if (this.elements.length > 0) {
      this.elements[0] = end
      this._cascadeDown()
    }
    return result ? result : null
  }
  _cascadeDown(index = 0) {
    const left = index * 2 + 1
    const right = index * 2 + 2
    const leftElement = left < this.elements.length ? this.elements[left] : null
    const rightElement = right < this.elements.length ? this.elements[right] : null
    const currentElement = this.elements[index]

    if (!leftElement && !rightElement) return

    if (
      rightElement &&
      rightElement.priority <= leftElement.priority &&
      rightElement.priority <= currentElement.priority
    ) {
      this._swap(index, right)
      return this._cascadeDown(right)
    }

    if (leftElement.priority <= currentElement.priority) {
      this._swap(index, left)
      return this._cascadeDown(left)
    }
  }
}

class Element {
  constructor(value, priority) {
    this.value = value
    this.priority = priority
  }
}

module.exports = { PriorityQueue }
