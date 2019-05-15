// not very good choice. does minimize writing to memory.
function selectionSort(arr, compare = null) {
  for (let i = 0; i < arr.length; i += 1) {
    let minAt = i
    for (let j = i; j < arr.length; j += 1) {
      minAt = minValueAt(minAt, j)
    }
    if (i !== minAt) swap(arr, minAt, i)
  }

  function minValueAt(i, j) {
    const isValueAtIGreater = compare
      ? compare(arr[i], arr[j]) > 0
      : arr[i] > arr[j]
    return isValueAtIGreater ? j : i
  }
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// const nums = ['b', 'd', 'a', 'c']
// console.log(nums)
// selectionSort(nums, (a, b) => (a > b ? 1 : -1))
// console.log(nums)
