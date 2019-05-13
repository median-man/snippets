/*
Returns true when array b contains the square of each value
in array b. The frequency of the values must be the same.
The values do not have to be in the same order.

same([1, 1, 2], [4, 1, 1]) // true
*/

function sameFrequency(a, b) {
    const expectedFrequencies = getFrequencies(a.map(n => n * n))
    const actualFrequencies = getFrequencies(b)
    return shallowEquals(expectedFrequencies, actualFrequencies)
}

function getFrequencies(arr) {
    return arr.reduce((acc, value) => ({...acc, [value]: acc[value] + 1 || 1}), {})
}

function shallowEquals(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false
    }
    for (let key in a) {
        if (a[key] !== b[key]) {
            return false
        }
    }
    return true
}

sameFrequency([1,1,2], [4, 1, 1])
