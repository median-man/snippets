/*
Returns and array of two numbers or undefined.

Accepts a sorted array of integers and returns the
first pair whose sum is zero. Returns undefined
if no qualifying pair is found.
*/
console.assert(sumZero([]) === undefined, 'empty array')
console.assert(shallowEqualArrays(sumZero([-1, 1]), [-1, 1]), '-1, 1')

function sumZero(numbers) {
    const compliments = new Set()
    for (let n of numbers) {
        const compliment = 0 - n
        if (compliments.has(n)) {
            return [compliment, n]
        }
        compliments.add(compliment)
    }
}


function shallowEqualArrays(a, b) {
    if (!a || !b || a.length !== b.length) {
        return false
    }
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}