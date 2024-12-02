import { input } from "./data";

type Report = number[];

function parse(s: string): Report[] {
  return s.split("\n").map((x) => x.split(" ").map((y) => +y));
}

function isIncreasing(r: Report): boolean {
  return r.every((value: number, idx: number) =>
    idx === 0 ? true : value > r[idx - 1]
  );
}
function isDecreasing(r: Report): boolean {
  return r.every((value: number, idx: number) =>
    idx === 0 ? true : value < r[idx - 1]
  );
}
function isEveryWithinThree(r: Report): boolean {
  return r.every((value: number, idx: number) =>
    idx === 0 ? true : Math.abs(value - r[idx - 1]) <= 3
  );
}

function isSafe(r: Report): boolean {
  return r.some((_, idx) => {
    const copy = [...r];
    copy.splice(idx, 1);
    return (
      (isIncreasing(copy) || isDecreasing(copy)) && isEveryWithinThree(copy)
    );
  });
}

const reports = parse(input);

console.log(reports.filter(isSafe).length);
