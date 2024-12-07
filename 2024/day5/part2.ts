import { input } from "./data";

function createRules(r: string): { [key: string]: string[] } {
  const reducer = (acc: { [key: string]: string[] }, curr: string) => {
    const [before, after] = curr.split("|");
    if (!acc[before]) {
      acc[before] = [];
    }
    acc[before].push(after);
    return acc;
  };
  return r.split("\n").reduce(reducer, {});
}

function isInCorrectOrder(
  s: string,
  rules: { [key: string]: string[] }
): boolean {
  const values = s.split(",");
  for (let i = 1; i < values.length; i++) {
    const pagesBefore = values.slice(0, i);
    if (rules[values[i]]) {
      if (rules[values[i]].some((x) => pagesBefore.includes(x))) {
        return false;
      }
    }
  }
  return true;
}
function fixOrdering(p: string, rules: { [key: string]: string[] }): string {
  const initial = p.split(",");
  initial.sort((a, b) => {
    if (!rules[a] && !rules[b]) {
      return -1;
    }
    if (rules[a] && !rules[b]) {
      return 1;
    }
    if (!rules[a] && rules[b]) {
      return -1;
    }
    if (rules[a].includes(b)) {
      return 1;
    }
    if (rules[b].includes(a)) {
      return -1;
    }
    return 0;
  });
  return initial.join(",");
}

const [ruleInput, pagesToUpdateInput] = input.split("\n\n");
const rules = createRules(ruleInput);
const output = pagesToUpdateInput
  .split("\n")
  .filter((p) => !isInCorrectOrder(p, rules))
  .map((p) => fixOrdering(p, rules))
  .map((p) => {
    const nums = p.split(",").map((x) => +x);
    return nums[Math.floor(nums.length / 2)];
  })
  .reduce((a, b) => a + b, 0);

console.log(output);
