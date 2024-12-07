import { input } from "./data";

type Equation = {
  result: number;
  values: number[];
};

function parse(s: string): Equation {
  const [result, values] = s.split(":");
  return {
    result: +result,
    values: values
      .trim()
      .split(" ")
      .map((x) => +x),
  };
}

function isEquationValid(e: Equation): boolean {
  var slots = e.values.length - 1;
  var numberOfPossibilities = Math.pow(3, slots);
  for (let i = 0; i < numberOfPossibilities; i++) {
    const operationString = i.toString(3).padStart(slots, "0");
    const total = e.values.reduce((a, b, idx) => {
      const op = operationString[idx - 1];
      if (op === "0") {
        return a + b;
      } else if (op === "1") {
        return a * b;
      } else {
        return +`${a}${b}`;
      }
    });
    if (total === e.result) {
      return true;
    }
  }
  return false;
}

const result = input
  .split("\n")
  .map(parse)
  .filter((e) => isEquationValid(e))
  .map((e) => e.result)
  .reduce((a, b) => a + b, 0);

console.log(result);
