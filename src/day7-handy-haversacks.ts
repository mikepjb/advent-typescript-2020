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

type BagLookup = {[key: string]: Bag}

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

const canContain = (bagLookup: BagLookup, bag: Bag, childColor: Color): boolean => {
  if (bag.rules.some(r => r.color === childColor)) {
    return true
  } else {
    return bag.rules.some(r => canContain(bagLookup, bagLookup[r.color], childColor))
  }
}

const numberOfBagsInside = (bagLookup: BagLookup, color: Color): number => {
  const bag = bagLookup[color]
  const directBagsCount = bag.rules.reduce((coll, r) => coll += r.amount, 0)
  const indirectBagsCount = bag.rules.reduce((coll, r) => coll += r.amount * numberOfBagsInside(bagLookup, r.color), 0)
  return directBagsCount + indirectBagsCount
}

const bagRulesRaw: Bag[] = fs.readFileSync('data/input-7.txt')
  .toString()
  .split('\n').slice(0, -1)
  .map(l => parseRule(l))

const bags: {[key: string]: Bag} = {}

bagRulesRaw.forEach(rr => { bags[rr.color] = rr; })

const targetColor = 'shiny gold'
let minimumBagCount = 9999
let minimumBagCountColor = 'none'

const validParentBags: Bag[] = []

Object.keys(bags).map(c => {
  const bag = bags[c]
  console.log(bag)
  if (canContain(bags, bag, targetColor)) {
    validParentBags.push(bag)
    const bagCount = numberOfBagsInside(bags, bag.color)
    if (bagCount < minimumBagCount) {
      minimumBagCount = bagCount
      minimumBagCountColor = bag.color
    }
  }
})

console.log(validParentBags.map(b => b.color))
console.log(validParentBags.length)

console.log(numberOfBagsInside(bags, targetColor)) // shiny gold is 249.. lower than too low 273

// 273 is too low
// console.log(minimumBagCount)
// console.log(minimumBagCountColor)
