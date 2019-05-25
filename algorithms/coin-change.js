/* 
  Returns the number of ways that numbers from
  denominations may be summed to equal amount.
  Denominations may be repeated any number of times.

  coinChange([1, 5], 6) // 2
*/
function coinChange(denominations, amount) {}

const colors = (function createColors() {
  const DEFAULT_COLOR = 39

  const makeColor = (startCode, endCode) => s =>
    `\x1b[${startCode}m${s}\x1b[${endCode}m`

  return {
    green: makeColor(32, DEFAULT_COLOR),
    red: makeColor(31, DEFAULT_COLOR)
  }
})()

const test = (amount, expected) => {
  const actual = coinChange([1, 5, 10, 25], amount)
  const text = `coinChange([1, 5, 10, 25], ${amount}) => ${actual}`
  console.log(actual === expected ? colors.green(text) : colors.red(text))
}
test(1, 1)
