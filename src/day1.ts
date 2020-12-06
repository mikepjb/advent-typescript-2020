import fs from 'fs'

const expenseTotals: number[] = fs.readFileSync('data/day1-input.txt')
  .toString()
  .split('\n')
  .map(t => parseInt(t))

expenseTotals.map((t1, i1) => {
  expenseTotals.map((t2, i2) => {
    if (i1 !== i2 && t1 + t2 == 2020) {
      console.log('entry 1: ' + t1 + ', entry 2: ' + t2)
      console.log('product: ' + t1 * t2)
    }
  })
})

console.log(expenseTotals)
