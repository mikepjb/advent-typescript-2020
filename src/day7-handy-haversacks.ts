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

  if (rulesString !== 'no other bags.') {
    rulesString.split(', ').map(s => {
      const amountRaw = s.slice(0, s.indexOf(' '))
      const amountColorRaw = s.slice(s.indexOf(' ')+1)
      const amount = parseInt(amountRaw)
      const amountColor = amountColorRaw.split(' bag')[0]
      rules.push({color: amountColor, amount})
    })
  }

  return {color, rules}
}

const canContain = (bagLookup: {[key: string]: Bag}, bag: Bag, childColor: Color): boolean => {
  if (bag.rules.some(r => r.color === childColor)) {
    return true
  } else {
    return bag.rules.some(r => canContain(bagLookup, bagLookup[r.color], childColor))
  }
}

const bagRulesRaw: Bag[] = fs.readFileSync('data/input-7.txt')
  .toString()
  .split('\n').slice(0, -1)
  .map(l => parseRule(l))

const bags: {[key: string]: Bag} = {}

bagRulesRaw.forEach(rr => { bags[rr.color] = rr; })

const targetColor = 'shiny gold'

const validParentBags: Bag[] = []

Object.keys(bags).map(c => {
  const bag = bags[c]
  console.log(bag)
  if (canContain(bags, bag, targetColor)) {
    validParentBags.push(bag)
  }
})

console.log(validParentBags.map(b => b.color))
console.log(validParentBags.length)
