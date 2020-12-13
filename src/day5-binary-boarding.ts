import fs from 'fs'

type SeatCode = string
type SeatCoordinates = {row: number, column: number}
type SeatID = number

const seatCodes: SeatCode[] = fs.readFileSync('data/input-5.txt')
  .toString()
  .split('\n')

const calculateSeat = (code: SeatCode): SeatID => {
  const columnCode = code.slice(0, 7)
    .replace(new RegExp('B', 'g'), '1')
    .replace(new RegExp('F', 'g'), '0')
  const rowCode = code.slice(7)
    .replace(new RegExp('R', 'g'), '1')
    .replace(new RegExp('L', 'g'), '0')
  return parseInt(columnCode, 2) * 8 + parseInt(rowCode, 2)
}

let highestSeatNumber = 0

seatCodes.forEach(c => {
  const seatID = calculateSeat(c)
  if (seatID > highestSeatNumber) {
    highestSeatNumber = seatID
  }
})

console.log('highest seat number: ' + highestSeatNumber)

const allTakenSeats = seatCodes.map(c => calculateSeat(c))

console.log(allTakenSeats.sort())

let currentSeat = 100

while (currentSeat <= 906) {
  if (allTakenSeats.indexOf(currentSeat) === -1) {
    console.log('SeatID: ' + currentSeat + ' is free!')
  }
  currentSeat++
}
