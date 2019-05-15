function radixSort(numbers) {
  let result = numbers
  const maxPosition = maxDigits(numbers)
  for (let position = 0; position < maxPosition; position += 1) {
    const buckets = Array.from(Array(10), () => [])
    result.forEach(n => buckets[digitAtPosition(n, position)].push(n))
    result = [].concat(...buckets)
  }
  return result
}
// console.log(radixSort([9000, 99, 129, 7, 9002])) // [7, 99, 129, 9000, 9002]

function maxDigits(numbers) {
  return numbers.reduce((max, n) => Math.max(max, countDigits(n)), 0)
}
// console.log(maxDigits([1, 12, 123456])) // 6

function countDigits(num, base = 10) {
  return num === 0 ? 1 : Math.floor(Math.log(num) / Math.log(base)) + 1
}
// console.log(countDigits(12345)) // 5

function digitAtPosition(num, position, base = 10) {
  return Math.floor(Math.abs(num) / Math.pow(base, position)) % base
}
// console.log(digitAtPosition(57892, 5)) // 0
// console.log(digitAtPosition(57892, 0)) // 2

function alphabeticRadixSort(words) {
  let result = words
  const maxPosition = maxLength(words)
  for (let position = maxPosition - 1; position >= 0; position -= 1) {
    const buckets = Array.from(Array(27), () => [])
    result.forEach(word => buckets[sortMode(word, position)].push(word))
    result = [].concat(...buckets)
  }
  return result
}
// console.log(alphabeticRadixSort(['abc', 'ab', 'zero', 'hi']))
// [ 'ab', 'abc', 'hi', 'zero' ]

function maxLength(words) {
  return Math.max(...words.map(word => word.length))
}
// console.log(longestWord(['1', '1234', '12', '1234567'])) // 7

function sortMode(word, position) {
  return word.charCodeAt(position) - 96 || 0
}
// console.log(sortMode('abc', 0)) // 1 (a is the 1st letter in [a-z])
// console.log(sortMode('hello', 4)) // 15 (o is the 15th letter in [a-z])
// console.log(sortMode('hello', 5)) // 0 (no character at index 5)
