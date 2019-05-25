// returns the nth number in fibonacci sequence
function fibonacci(n, memo = {}) {
  if (n <= 2) return 1
  if (memo[n]) return memo[n]
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
  return memo[n]
}

function tabulatedFib(n) {
  const table = {
    1: 1,
    2: 1
  }
  for (let m = 3; m <= n; m += 1) {
    table[m] = table[m - 1] + table[m - 2]
  }
  return table[n]
}

const from = 10
for (let n = from; n < from + 5; n += 1) {
  console.log(tabulatedFib(n))
}