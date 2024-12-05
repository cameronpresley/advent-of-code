import {input} from './data';
const grid = input.split("\n");

function isInBounds(row: number, column: number): boolean {
  return (
    row >= 0 && row < grid.length && column >= 0 && column < grid[0].length
  );
}

function checkForward(row: number, column: number): boolean {
  return (
    isInBounds(row, column + 3) &&
    grid[row][column] === "X" &&
    grid[row][column + 1] === "M" &&
    grid[row][column + 2] === "A" &&
    grid[row][column + 3] === "S"
  );
}
function checkBackward(row: number, column: number): boolean {
  return (
    isInBounds(row, column - 3) &&
    grid[row][column] === "X" &&
    grid[row][column - 1] === "M" &&
    grid[row][column - 2] === "A" &&
    grid[row][column - 3] === "S"
  );
}
function checkDown(row: number, column: number): boolean {
  return (
    isInBounds(row+3, column) &&
    grid[row][column] === "X" &&
    grid[row+1][column] === "M" &&
    grid[row+2][column] === "A" &&
    grid[row+3][column] === "S"
  );
}

function checkUp(row: number, column: number): boolean {
  return (
    isInBounds(row-3, column) &&
    grid[row][column] === "X" &&
    grid[row-1][column] === "M" &&
    grid[row-2][column] === "A" &&
    grid[row-3][column] === "S"
  );
}

function checkUpperLeft(row: number, column: number): boolean {
  return (
    isInBounds(row-3, column-3) &&
    grid[row][column] === "X" &&
    grid[row-1][column-1] === "M" &&
    grid[row-2][column-2] === "A" &&
    grid[row-3][column-3] === "S"
  );
}
function checkUpperRight(row: number, column: number): boolean {
  return (
    isInBounds(row-3, column+3) &&
    grid[row][column] === "X" &&
    grid[row-1][column+1] === "M" &&
    grid[row-2][column+2] === "A" &&
    grid[row-3][column+3] === "S"
  );
}

function checkLowerLeft(row: number, column: number): boolean {
  return (
    isInBounds(row+3, column-3) &&
    grid[row][column] === "X" &&
    grid[row+1][column-1] === "M" &&
    grid[row+2][column-2] === "A" &&
    grid[row+3][column-3] === "S"
  );
}

function checkLowerRight(row: number, column: number): boolean {
  return (
    isInBounds(row+3, column+3) &&
    grid[row][column] === "X" &&
    grid[row+1][column+1] === "M" &&
    grid[row+2][column+2] === "A" &&
    grid[row+3][column+3] === "S"
  );
}



function check(row: number, column: number): number {
  return [
    checkForward(row, column),
    checkBackward(row,column),
    checkDown(row,column),
    checkUp(row,column),
    checkUpperLeft(row, column),
    checkUpperRight(row,column),
    checkLowerLeft(row,column),
    checkLowerRight(row,column)
  ].filter((x) => !!x).length;
}
let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    total += check(i, j);
  }
}
console.log(total);
