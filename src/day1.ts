import fs from 'fs'

const expenseTotals: number[] = fs.readFileSync('data/input1.txt')
  .toString()
  .split('\n')
  .map(t => parseInt(t))

// part 1, finding the 2020 sum from two parts
expenseTotals.map((t1, i1) => {
  expenseTotals.map((t2, i2) => {
    if (i1 !== i2 && t1 + t2 == 2020) {
      console.log('entry 1: ' + t1 + ', entry 2: ' + t2)
      console.log('product: ' + t1 * t2)
    }
  })
})


// part 2, finding the 2020 sum from three parts
expenseTotals.map((t1, i1) => {
  expenseTotals.map((t2, i2) => {
    expenseTotals.map((t3, i3) => {
      if (i1 !== i2 && i2 !== i3 && t1 + t2 + t3 == 2020) {
        console.log('entry 1: ' + t1 + ', entry 2: ' + t2 + ', entry 3: ' + t3)
        console.log('product: ' + t1 * t2 * t3)
      }
    })
  })
})


console.log(expenseTotals)
