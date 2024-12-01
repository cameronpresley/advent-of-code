import { input } from "./data";

type Pair = {
  first: number[];
  second: number[];
};

function parse(s: string): Pair {
  const start: Pair = { first: [], second: [] };

  return s.split("\n").reduce((acc, curr) => {
    const values = curr.split(" ").filter((x) => !!x);
    acc.first.push(+values[0]);
    acc.second.push(+values[values.length - 1]);
    return acc;
  }, start);
}

function sort(p: Pair): Pair {
  const sortNumbers = (x: number[]) => [...x].sort((a, b) => a - b);
  return {
    first: sortNumbers(p.first),
    second: sortNumbers(p.second),
  };
}

function calculateDistance([first, second]: number[]): number {
  return Math.abs(first - second);
}

function add(a: number, b: number): number {
  return a + b;
}

const pairs = sort(parse(input));

const output = pairs.first
  .map((_, idx) => [pairs.first[idx], pairs.second[idx]])
  .map(calculateDistance)
  .reduce(add, 0);

console.log(output);
