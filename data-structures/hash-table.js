class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size)
  }

  _hash(key) {
    let total = 0
    const PRIME_NUM = 31
    for (let char of key.substr(0, 100).toLowerCase()) {
      total = (total * PRIME_NUM + char.charCodeAt(0) - 96) % this.keyMap.length
    }
    return total
  }

  set(key, value) {
    const hash = this._hash(key)
    if (!this.keyMap[hash]) this.keyMap[hash] = []
    const entry = this.keyMap[hash].find(([aKey]) => aKey === key)
    if (entry) {
      entry[1] = value
    } else {
      this.keyMap[hash].push([key, value])
    }
  }

  get(key) {
    const pairs = this.keyMap[this._hash(key)]
    for (let [aKey, value] of pairs) {
      if (aKey === key) return value
    }
  }

  *[Symbol.iterator]() {
    const nonEmptyElements = this.keyMap.filter(a => a)
    for (const entries of nonEmptyElements) {
      for (const keyValue of entries) {
        yield keyValue
      }
    }
  }

  keys() {
    let result = []
    for (const [key] of this[Symbol.iterator]()) {
      result.push(key)
    }
    return Array.from(new Set(result))
  }

  values() {
    let result = []
    for (const [, value] of this[Symbol.iterator]()) {
      result.push(value)
    }
    return Array.from(new Set(result))
  }
}

const colorMap = new HashTable()
