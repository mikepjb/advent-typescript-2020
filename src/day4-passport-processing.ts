import fs from 'fs'

const passportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
// 'cid' field is ignored in the first part

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
