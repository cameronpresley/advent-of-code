import {input} from './data';
const grid = input.split("\n");

function isInBounds(row: number, column: number): boolean {
  return (
    row > 0 && row < grid.length-1 && column > 0 && column < grid[0].length-1
  );
}

function check(row: number, column: number): boolean {
  return (
    isInBounds(row, column)
    && grid[row][column] === 'A'
    && (
      (grid[row-1][column-1] ==='M' && grid[row+1][column+1] === 'S')
      || (grid[row-1][column-1] ==='S' && grid[row+1][column+1]==='M')
    )
    && (
      (grid[row-1][column+1] ==='S' && grid[row+1][column-1] == 'M')
      || (grid[row-1][column+1] ==='M' && grid[row+1][column-1] == 'S')
  ));
  
}
let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (check(i, j)) {
      // console.log(`${i}, ${j}`);
      total+=1;
    }
  }
}
console.log(total);
