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

let pos: Position = {x: 0, y: 0}
let treesFound = 0
const slope: Slope = {right: 3, down: 1}

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

console.log(treesFound)
