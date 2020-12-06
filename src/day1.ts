import fs from 'fs'

const expenseTotals: number[] = fs.readFileSync('data/day1-input.txt')
  .toString()
  .split('\n')
  .map(t => parseInt(t))

console.log(expenseTotals)
