// worst case O(n^2) (reversed)
// very efficient on nearly sorted data (almost linear time)
// good for maintaining sorted data as it comes in.
// good on small data sets compared to other sorting algorithms
function insertionSort(arr, compare) {
  for (let i = 1; i < arr.length; i += 1) {
    let currentVal = arr[i]
    let j = i - 1
    for (; j >= 0 && compare(currentVal, arr[j]) < 0; j -= 1) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = currentVal
  }
}

// const nums = ['b', 'd', 'a', 'c']
// console.log(nums)
// insertionSort(nums, (a, b) => (a > b ? 1 : -1))
// console.log(nums)
