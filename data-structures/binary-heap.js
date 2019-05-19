class MaxBinaryHeap {
  constructor() {
    this.values = []
  }

  insert(value) {
    this.values.push(value)
    this.bubble(this.values.length - 1)
  }

  bubble(index) {
    const parentIndex = Math.floor((index - 1) / 2)
    if (index > 0 && this.values[parentIndex] < this.values[index]) {
      this.swap(index, parentIndex)
      this.bubble(parentIndex)
    }
  }

  swap(i, j) {
    const temp = this.values[i]
    this.values[i] = this.values[j]
    this.values[j] = temp
  }

  removeMax() {
    if (this.values.length > 1) {
      const max = this.values[0]
      this.values[0] = this.values.pop()
      this.cascadeDown()
      return max
    }
    return this.values.pop()
  }

  cascadeDown(index = 0) {
    const next = this.maxChildAt(index)
    if (next === -1 || this.values[index] >= this.values[next]) return
    this.swap(index, next)
    this.cascadeDown(next)
  }

  maxChildAt(parentIndex) {
    const left = 2 * parentIndex + 1
    const right = 2 * parentIndex + 2
    return left >= this.values.length && right >= this.values.length
      ? -1
      : left >= this.values.length
      ? right
      : right >= this.values.length
      ? left
      : this.values[left] > this.values[right]
      ? left
      : right
  }
}

/* 
41
 └───┬───┐
     19  36
     │   └──────────┬───┐
     └───────┬──┐   │   │
             5  18  16  24
[41, 19, 36, 5, 18, 16, 24]
36 19 36 5 18 16 24
36 19 24 5 18 16 24
36 19 24 5 18 16
*/
