import fs from 'fs'

const encodingStream: number[] = fs.readFileSync('data/input-9.txt')
  .toString()
  .split('\n').slice(0, -1).map(n => parseInt(n))

const payload = encodingStream.slice(25)

const validSums = (preamble: number[]): number[] => {
  return preamble.map((n, i) => {
    return preamble.filter((nn, ii) => i !== ii).map(nn => n + nn)
  }).flat()
}

const findInvalid = (encodingStream: number[], payload: number[]): number => {
  for (let i = 0; i < payload.length; i++) {
    const n = payload[i]
    const preamble = validSums(encodingStream.slice(0+i,25+i))
    if (preamble.indexOf(n) === -1) {
      return n
    }
  }
  return -1
}

const invalidNumber = findInvalid(encodingStream, payload)
console.log(invalidNumber)

const sum = (ns: number[]): number => {
  return ns.reduce((coll, n) => coll += n, 0)
}

// part 2: find the list of contiguous numbers that total the invalid number.
const findSum = (encodingStream: number[], invalidNumber: number, startingIndex: number): number[] => {
  const sumList: number[] = []

  for (let i = startingIndex; sum(sumList) < invalidNumber && i < encodingStream.length; i++) {
    sumList.push(encodingStream[i])
  }

  return sumList
}

for (let i = 0; i < encodingStream.length; i++) {
  let ns = findSum(encodingStream, invalidNumber, i)
  if (sum(ns) === invalidNumber) {
    console.log('list found', ns)
    console.log(Math.max(...ns))
    console.log(Math.min(...ns))
    console.log(Math.min(...ns) + Math.max(...ns))
    process.exit(0)
  }
}
// sum the smallest and largest number from the result to find the 'encryption
// weakness'
