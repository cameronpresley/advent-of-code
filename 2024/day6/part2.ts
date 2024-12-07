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

function getPossibleObstacleLocations(g: Grid, p: GuardPosition): Position[] {
  const positions: Position[] = [];
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if ((g[j][i] !== "#" && p.x !== j) || p.y !== i) {
        positions.push({ x: j, y: i });
      }
    }
  }
  return positions;
}

function createCopyOfGrid(g:Grid, newObstacle:Position): Grid {
  const newGrid:Grid = [];
  for (let i = 0; i < g.length; i++) {
    newGrid.push('');
    for (let j = 0; j < g[i].length; j++) {
      newGrid[i] += (j === newObstacle.x && i === newObstacle.y ? '#' : g[i][j]);
    }
  }
  return newGrid;
}
const initialGrid: Grid = input.split("\n");
const startPosition = getGuardStart(initialGrid);

const obstacleLocations = getPossibleObstacleLocations(
  initialGrid,
  startPosition
);
let loopCount = 0;
for (const obstacleLocation of obstacleLocations) {
  let guardPosition = startPosition;
  const grid = createCopyOfGrid(initialGrid, obstacleLocation);
  const positions: string[] = [];
  while (isGuardInGrid(grid, guardPosition)) {
  
    positions.push(JSON.stringify(guardPosition));
    guardPosition = moveGuard(grid, guardPosition);
    if (positions.includes(JSON.stringify(guardPosition))) {
      loopCount++;
      break;
    }
  }
}
console.log(loopCount); // should be 6
