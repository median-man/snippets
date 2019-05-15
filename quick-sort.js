// iterative version is only limited by the maximum size
// of an array in javascript
function quickSort(arr) {
  const partitions = [createPartition(0, arr.length - 1)]
  let part, pivotAt
  while (partitions.length) {
    part = partitions.pop()
    pivotAt = pivot(arr, part.start, part.end)
    if (pivotAt > part.start) {
      partitions.push(createPartition(part.start, pivotAt - 1))
    }
    if (pivotAt < part.end) {
      partitions.push(createPartition(pivotAt + 1, part.end))
    }
  }
  return arr

  function createPartition(start, end) {
    return { start, end }
  }
}

// recursive solution (max call stack on my desktop is hit when array contains
// 125361 elements)
// function quickSort(arr, startAt = 0, endAt = arr.length - 1) {
//   if (startAt < endAt) {
//     const pivotIndex = pivot(arr, startAt, endAt)
//     quickSort(arr, startAt, pivotIndex - 1)
//     quickSort(arr, pivotIndex + 1, endAt)
//   }
//   return arr
// }

// function* generateRandomInt(size) {
//   for (let counter = 0; counter < size; counter += 1) {
//     yield Math.floor(Math.random() * size)
//   }
// }
// const largeArray = Array.from(generateRandomInt(1000000))
// const numbers = [2, 13, 4, 9, 1]

// console.log(largeArray ? largeArray.slice(0, 30) : numbers)
// const res = quickSort(largeArray || numbers)
// console.log(largeArray ? largeArray.slice(0, 30) : numbers)

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const pivotValue = arr[startIndex]
  let pivotAt = startIndex
  for (let i = pivotAt + 1; i <= endIndex; i += 1) {
    if (arr[i] < pivotValue) {
      const temp = arr[i]
      arr[i] = arr[pivotAt + 1]
      arr[pivotAt + 1] = temp
      pivotAt += 1
    }
  }
  arr[startIndex] = arr[pivotAt]
  arr[pivotAt] = pivotValue
  return pivotAt
}

// console.log(numbers)
// pivot(numbers)
// console.log(numbers)
