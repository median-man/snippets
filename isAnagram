/*
Returns true if b is an anagram of a.
*/

function isAnagram(a, b) {
    return shallowEquals(
        calculateFrequencies(a.split('')),
        calculateFrequencies(b.split(''))
    )
}

function calculateFrequencies(arr) {
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

isAnagram('abc', 'bca')