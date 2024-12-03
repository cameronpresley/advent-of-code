import { input } from "./data";
const multPattern = new RegExp(/mul\(\d{1,3},\d{1,3}\)/, "gm");

const add = (a: number, b: number): number => a + b;
const mult = (a: number, b: number): number => a * b;
function sanitize(s: string): number[] {
  return s
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((x) => +x);
}

const matches = Array.from(input.matchAll(multPattern));

const output = matches
  .map((m) => sanitize(m[0]))
  .map((x) => mult(x[0], x[1]))
  .reduce(add, 0);

console.log(output);
