function charCount(s) {
    const increment = (counts, char) =>
        ({ ...counts, [char]: counts[char] + 1 || 1 })

    return s
        .replace(/[\W_]/g, '')
        .toLowerCase()
        .split('')
        .reduce(increment, {})
}
console.log(charCount("You are #1!"))