/*
Returns the count of unique values in given array.

Array must be a sorted array of numbers.
*/
function countUniqeValues(numbers) {
    let count = numbers.length > 0 ? 1 : 0
    for (let i = 0; i < numbers.length - 1; i += 1) {
        if (numbers[i] !== numbers[i + 1]) {
            count += 1
        }
    }
    return count
}