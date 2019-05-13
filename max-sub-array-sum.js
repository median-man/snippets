/*
Returns number for the maximum sum from of n consecutive
numbers found in the input array. Returns null if length
of numbers array < n.
*/
function maxSubarraySum(numbers, n) {
    if (numbers.length < n) return null
    let currentSum = 0
    for (let i = 0; i < n; i += 1) {
        currentSum += numbers[i]
    }
    let maxSum = currentSum
    for (let i = n; i < numbers.length; i += 1) {
        currentSum += numbers[i] - numbers[i - n]
        maxSum = maxSum > currentSum ? maxSum : currentSum
    }
    return maxSum
}
