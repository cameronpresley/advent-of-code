import { input } from "./data";

const multPattern = new RegExp(/mul\(\d{1,3},\d{1,3}\)/, "gm");
const doPattern = new RegExp(/do\(\)/, "gm");
const dontPattern = new RegExp(/don\'t\(\)/, "gm");

const add = (a: number, b: number): number => a + b;
const mult = (a: number, b: number): number => a * b;

function sanitize(s: string): number[] {
  return s
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((x) => +x);
}

function getMatches(r: RegExp, s: string): RegExpExecArray[] {
  return Array.from(s.matchAll(r));
}

function shouldBeComputed(
  item: RegExpExecArray,
  dos: RegExpExecArray[],
  donts: RegExpExecArray[]
): boolean {
  const lastDo = dos.filter((d) => d.index < item.index).slice(-1);
  const lastDont = donts.filter((d) => d.index < item.index).slice(-1);
  if (!lastDo.length && !lastDont.length) return true;
  if (lastDo.length && !lastDont.length) return true;
  if (!lastDo.length && lastDont.length) return false;
  return lastDo[0].index > lastDont[0].index;
}

const matches = getMatches(multPattern, input);
const dos = getMatches(doPattern, input);
const donts = getMatches(dontPattern, input);

const output = matches
  .filter((x) => shouldBeComputed(x, dos, donts))
  .map((m) => sanitize(m[0]))
  .map((x) => mult(x[0], x[1]))
  .reduce(add, 0);

console.log(output);
