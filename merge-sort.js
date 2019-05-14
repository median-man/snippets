function mergeSort(arr) {
  if (arr.length < 2) return arr
  const midIndex = Math.floor(arr.length / 2)
  return merge(
    mergeSort(arr.slice(0, midIndex)),
    mergeSort(arr.slice(midIndex))
  )
}

// const numbers = [2, 9, 4, 6, 3]
// console.log(numbers)
// console.log(mergeSort(numbers))

function merge(a, b) {
  let i = 0
  let j = 0
  const result = []
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i])
      i += 1
    } else {
      result.push(b[j])
      j += 1
    }
  }
  result.push(...a.slice(i))
  result.push(...b.slice(j))
  return result
}

// const arr1 = [3, 5]
// const arr2 = [2, 7]
// console.log(merge(arr1, arr2))
