import fs from 'fs'

const instructions: string[] = fs.readFileSync('data/input-8.txt')
  .toString()
  .split('\n').slice(0, -1)

type Result = {acc: number, index: number}

const execute = (instructions: string[]): Result => {
  let accumulator = 0
  const hasRun: number[] = [] // indexes that have already been called
  let index = 0

  while(hasRun.indexOf(index) === -1 && index < instructions.length) {
    hasRun.push(index)
    const i = instructions[index]
    console.log(index, i)
    const [fn, arg] = i.split(' ')
    console.log(fn, arg)
    switch(fn) {
      case 'acc':
        accumulator += parseInt(arg)
        index++
        break;
      case 'jmp':
        index += parseInt(arg)
        break;
      default:
        // ignore case 'noops'
        index++
    }
  }

  return {acc: accumulator, index: index}
}

console.log(execute(instructions))

instructions.forEach((line, index) => {
  const [fn, arg] = line.split(' ')
  if (fn !== 'acc') {
    const clone = instructions.slice()
    clone[index] = (fn === 'jmp' ? 'nop' : 'jmp') + ' ' + arg
    const results = execute(clone)
    if (results.index === instructions.length) {
      console.log('change made at ' + index)
      console.log(results)
      process.exit(0)
    }
  }
})
