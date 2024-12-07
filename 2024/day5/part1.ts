import { input } from "./data";
// export {};

// const input = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

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

const [ruleInput, pagesToUpdateInput] = input.split("\n\n");
const rules = createRules(ruleInput);
const output = pagesToUpdateInput
  .split("\n")
  .filter((p) => isInCorrectOrder(p, rules))
  .map((p) => {
    const nums = p.split(",").map((x) => +x);
    return nums[Math.floor(nums.length / 2)];
  })
  .reduce((a, b) => a + b, 0);

console.log(output);

// 6034
