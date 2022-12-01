import { readFile } from "node:fs/promises";

const input = await readFile("./input.txt", "utf-8");

const elves = input.split(/(\n\n)/).filter((x) => !x.match(/\n\n/));

const elvesTotalCals = elves
  .map((x) => x.split(/\n/))
  .map((x) => x.reduce((sum, curr) => sum + Number(curr), 0))
  .sort((a, b) => b - a);

console.log(`The Elf carrying the most carries ${elvesTotalCals[0]} Calories.`);

const topThreeTotal = elvesTotalCals
  .slice(0, 3)
  .reduce((sum, curr) => sum + curr, 0);

console.log(
  `The top three Elves carrying the most carry ${topThreeTotal} in total`
);
