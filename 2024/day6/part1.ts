// export {};
// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;
import {input} from './data';
type Position = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type GuardPosition = Position & { direction: Direction };
type Grid = string[];

function getGuardStart(g: Grid): GuardPosition {
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (g[i][j] === "^") {
        return { x: j, y: i, direction: "up" };
      }
      if (g[i][j] === "v") {
        return { x: j, y: i, direction: "down" };
      }
      if (g[i][j] === "<") {
        return { x: j, y: i, direction: "left" };
      }
      if (g[i][j] === ">") {
        return { x: j, y: i, direction: "right" };
      }
    }
  }
  throw new Error("failboat");
}
function getNewDirection(d: Direction): Direction {
  switch (d) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
}

function isGuardInGrid(g: Grid, p: Position): boolean {
  return p.x >= 0 && p.x < g[0].length && p.y >= 0 && p.y < g.length;
}

function moveGuard(g: Grid, p: GuardPosition): GuardPosition {
  let newPosition: Position;

  switch (p.direction) {
    case "up":
      newPosition = { ...p, y: p.y - 1 };
      break;
    case "down":
      newPosition = { ...p, y: p.y + 1 };
      break;
    case "left":
      newPosition = { ...p, x: p.x - 1 };
      break;
    case "right":
      newPosition = { ...p, x: p.x + 1 };
      break;
  }
  if (!isGuardInGrid(g, newPosition)) {
    return { ...newPosition, direction: p.direction };
  }
  if (g[newPosition.y][newPosition.x] === "#") {
    return { ...p, direction: getNewDirection(p.direction) };
  } else {
    return { ...newPosition, direction: p.direction };
  }
}

const grid: Grid = input.split("\n");
let guardPosition = getGuardStart(grid);
const positions: Position[] = [];
while (isGuardInGrid(grid, guardPosition)) {
  positions.push(guardPosition);
  guardPosition = moveGuard(grid, guardPosition);
}
const output = Array.from(
  new Set(positions.map((p) => JSON.stringify({ x: p.x, y: p.y })))
).length;
console.log(output);
