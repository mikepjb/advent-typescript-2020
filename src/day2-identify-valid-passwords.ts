import fs from 'fs'

type PasswordPolicy = {
  character: string,
  upperRange: number,
  lowerRange: number
}

const rawPasswordEntries: string[] = fs.readFileSync('data/input-2.txt')
  .toString()
  .split('\n')
  .filter(e => typeof e === 'string' && e.length !== 0)

const processPolicy = (rawPolicy: string): PasswordPolicy => {
  const [rawRange, character] = rawPolicy.split(' ')
  const [lowerRange, upperRange] = rawRange.split('-').map(n => parseInt(n))
  return {character, upperRange, lowerRange}
}

const validPasswords: string[] = []
const validPasswordsForUpdatedPolicy: string[] = []

rawPasswordEntries.map((entry) => {
  const [rawPolicy, password] = entry.split(': ')
  const policy = processPolicy(rawPolicy)

  const occurances = password.match(new RegExp(policy.character, 'g'))?.length || 0

  if (occurances >= policy.lowerRange && occurances <= policy.upperRange) {
    validPasswords.push(password)
  }

  const firstOnly = policy.character === password[policy.lowerRange-1]
    && policy.character !== password[policy.upperRange-1]

  const secondOnly = policy.character !== password[policy.lowerRange-1]
    && policy.character === password[policy.upperRange-1]

  if (firstOnly || secondOnly) {
    validPasswordsForUpdatedPolicy.push(password)
  }
})

console.log(validPasswords)
console.log(validPasswords.length)

console.log(validPasswordsForUpdatedPolicy)
console.log(validPasswordsForUpdatedPolicy.length)
