// function quickSort(arr) {
//   if (arr.length < 2) return arr
//   const pivotValue = arr[0]
//   let j = 1
//   for (let i = 1; i < arr.length; i += 1) {
//     if (arr[i] < pivotValue) {
//       swap(arr, i, j)
//       j += 1
//     }
//   }
//   const left = quickSort(arr.slice(1, j))
//   left.push(pivotValue)
//   const right = quickSort(arr.slice(j))
//   return [...left, ...right]
// }

// function swap(arr, i, j) {
//   const temp = arr[i]
//   arr[i] = arr[j]
//   arr[j] = temp
// }

function quickSort(arr, startAt = 0, endAt = arr.length - 1) {
  if (startAt < endAt) {
    const pivotIndex = pivot(arr, startAt, endAt)
    quickSort(arr, startAt, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, endAt)
  }
  return arr
}
const numbers = [2, 13, 4, 9, 1]
console.log(numbers)
const res = quickSort(numbers)
console.log(numbers)
console.log(res)

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
