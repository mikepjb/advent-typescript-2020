import fs from 'fs'

type Color = string // might be a union type if we didn't trust the input data.

type ContentRule = {
  color: Color,
  amount: number
}

type ContentRules = ContentRule[]

type Bag = {
  color: Color,
  rules: ContentRules
}

const parseRule = (line: string): Bag => {
  const [color, rulesString] = line.split(' bags contain ')
  const rules: ContentRules = []
  rulesString.split(', ').map(s => {
    const amountRaw = s.slice(0, s.indexOf(' '))
    const amountColorRaw = s.slice(s.indexOf(' ')+1)
    const amount = parseInt(amountRaw)
    const amountColor = amountColorRaw.split(' bags')[0]
    rules.push({color: amountColor, amount})
  })
  return {color, rules}
}

const bagRules: Bag[] = fs.readFileSync('data/input-7.txt')
  .toString()
  .split('\n').slice(0, -1)
  .map(l => parseRule(l))

console.log(bagRules.slice(0, 5).map(r => JSON.stringify(r)))
