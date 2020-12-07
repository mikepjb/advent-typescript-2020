import fs from 'fs'

type Map = string[]
type Position = {x: number, y: number}
type Slope = {right: number, down: number}

const map: Map = fs.readFileSync('data/input-3.txt')
  .toString()
  .split('\n')

const treeCheck = (map: Map, x: number, y: number): boolean => {
  return map[y][x] === '#'
}

const slopeA: Slope = {right: 1, down: 1}
const slopeB: Slope = {right: 3, down: 1}
const slopeC: Slope = {right: 5, down: 1}
const slopeD: Slope = {right: 7, down: 1}
const slopeE: Slope = {right: 1, down: 2}

const checkSlope = (map: Map, slope: Slope): number => {
  let treesFound = 0
  let pos: Position = {x: 0, y: 0}
  while (pos.y < map.length) {
    if (treeCheck(map, pos.x, pos.y)) {
      console.log('found tree at: ' + pos.x + pos.y)
      treesFound++
    }
    pos.x += slope.right
    if (pos.x >= map[0].length) {
      pos.x -= map[0].length
    }
    pos.y += slope.down
  }
  return treesFound
}

const treeCountA = checkSlope(map, slopeA)
const treeCountB = checkSlope(map, slopeB)
const treeCountC = checkSlope(map, slopeC)
const treeCountD = checkSlope(map, slopeD)
const treeCountE = checkSlope(map, slopeE)

console.log(treeCountA, treeCountB, treeCountC, treeCountD, treeCountE)
console.log(treeCountA * treeCountB * treeCountC * treeCountD * treeCountE)
