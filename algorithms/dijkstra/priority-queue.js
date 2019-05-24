/* 
  Slow implementation using array and sorting for each enqueue call - O(nlogn)
*/
class PriorityQueue {
  constructor() {
    this.elements = []
  }
  enqueue(value, priority) {
    this.elements.push(new Element(value, priority))
    this._sort()
  }
  dequeue() {
    return this.elements.shift()
  }
  _sort() {
    return this.elements.sort((a, b) => a.priority - b.priority)
  }
}

class Element {
  constructor(value, priority) {
    this.value = value
    this.priority = priority
  }
}

module.exports = { PriorityQueue }
