import fs from 'fs'

const passportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const acceptedEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

type Credentials = {
  [k: string]: any
}

const passports: Credentials[] = fs.readFileSync('data/input-4.txt')
  .toString()
  .split('\n\n') // break into cred groups
  .map(g => g.replace(new RegExp('\n', 'g'), ' ')) // put all fields on a single line
  .map(line => {
    const creds: Credentials = {}
    line.split(' ').forEach(e => {
      const [k, v] = e.split(':')
      creds[k] = v
    })
    return creds
  })

const strictValidation = (creds: Credentials): boolean => { // for part 2
  const byr = parseInt(creds.byr)
  if (!(byr >= 1920 && byr <= 2002)) { return false; }

  const iyr = parseInt(creds.iyr)
  if (!(iyr >= 2010 && iyr <= 2020)) { return false; }

  const eyr = parseInt(creds.eyr)
  if (!(eyr >= 2020 && eyr <= 2030)) { return false; }

  const hgt = parseInt(creds.hgt.slice(0,-2))
  const metric = creds.hgt.slice(-2)
  if (!(metric == 'cm' && hgt >= 150 && hgt <= 193)
    && !(metric == 'in' && hgt >= 59 && hgt <= 76)) { return false; }

  const hcl = creds.hcl
  if (!(hcl.length === 7 && hcl[0] === '#')) { return false; }

  const ecl = creds.ecl
  if (acceptedEyeColors.indexOf(ecl) === -1) { return false; }

  const pid = creds.pid
  if (!(pid.length === 9 && /^\d+$/.test(pid))) { return false; }

  return true
}

// original, bad logic - took a while for figure it was bad - returns 286
// the reason this does not work is that you can't break a forEach loop in
// JS/TS (except with an exception..).
const xhasRequiredFields = (creds: Credentials) => {
  passportFields.forEach(f => {
    if (Object.keys(creds).indexOf(f) === -1) {
      return false
    }
  })
  return true
}


const hasRequiredFields = (creds: Credentials) => {
  const credFields = Object.keys(creds)
  const missingFields = passportFields.filter(f => credFields.indexOf(f) === -1)
  if (missingFields.length !== 0) {
    console.log('missing fields: ' + missingFields + ', for: ' + creds)
    return false
  }
  return true
}

let validPassports = passports.filter(hasRequiredFields)

console.log(validPassports)
console.log(validPassports.length)

let strictValidationPassports = passports
  .filter(hasRequiredFields)
  .filter(strictValidation)

console.log(strictValidationPassports)
console.log(strictValidationPassports.length)
