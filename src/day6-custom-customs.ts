import fs from 'fs'

const positiveResponses: string[] = fs.readFileSync('data/input-6.txt')
  .toString()
  .split('\n\n')
  .map(group => group.replace(new RegExp('\n', 'g'), ''))
  .map(group => group.split('').filter((i, p, self) => self.indexOf(i) === p).sort().join(''))

console.log(positiveResponses)

console.log(positiveResponses.map(g => g.length).reduce((coll, g) => coll += g, 0))

const groupResponses: string[][] = fs.readFileSync('data/input-6.txt')
  .toString()
  .split('\n\n')
  .map(group => group.split('\n').filter(e => e.length !== 0))

const exclusiveResponses = (group: string[]): string => {
  const groupAgrees = []
  let characterCode = 97

  while (characterCode <= 122) {
    let character = String.fromCharCode(characterCode)
    let allAgree = group.every(response => response.indexOf(character) !== -1)
    console.log('checking ' + character + ' in ' + group + ' ' + allAgree)
    if (allAgree) {
      groupAgrees.push(character)
    }
    characterCode++
  }
  return groupAgrees.join('')
}

const exclusivePositiveResponses = groupResponses.map(exclusiveResponses)
console.log(exclusivePositiveResponses)

console.log(exclusivePositiveResponses.map(g => g.length).reduce((coll, l) => coll += l, 0))
