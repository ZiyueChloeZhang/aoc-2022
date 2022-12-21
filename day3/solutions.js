import { parseFileToLines } from "../util.js";

const input = await parseFileToLines("./input.txt");
const examples = await parseFileToLines("./example.txt");

const priorities = (rucksacks) =>
  rucksacks.map((rucksack) => {
    const length = rucksack.length;

    const mid = ~~(length / 2);
    let p1 = 0;
    let p2 = mid;

    const itemSet = new Set();

    const headSet = new Set();
    const tailSet = new Set();

    while (p1 < mid && p2 < length) {
      const i1 = rucksack[p1];
      const i2 = rucksack[p2];

      if (headSet.has(i1)) itemSet.delete(i1);
      if (tailSet.has(i2)) itemSet.delete(i2);

      headSet.add(i1);
      tailSet.add(i2);

      if (i1 == i2) return letterToInt(i1);
      if (itemSet.has(i1)) return letterToInt(i1);
      if (itemSet.has(i2)) return letterToInt(i2);

      itemSet.add(i1).add(i2);

      p1++;
      p2++;
    }

    throw new Error("no common item");
  });

const partOne = getSum(priorities(input));

// console.log(`Part One: ${partOne}`);

// part 2

/**
 *
 * @param {} sacks
 * @param {*} n - group size
 * @returns an array of groups of n
 */
const getGroups = (sacks, n) => {
  return sacks.reduce((accGroups, currSack, currIndex, allSacks) => {
    const remainder = currIndex % n;
    if (remainder === 0) {
      const newGroup = [];
      let i = 0;

      for (let i = 0; i < n; i++) {
        newGroup.push(allSacks[currIndex + i]);
      }

      return [...accGroups, newGroup];
    }
    return accGroups;
  }, []);
};

// item is a
// sack is asdfaskdfjlsadfj
const findCommonItem = (sacks) => {
  const shortestLength = getMin(sacks.map((x) => x.length));

  const itemSet = new Set();
  const sackSets = sacks.map(() => new Set());

  for (let p = 0; p < shortestLength; p++) {
    sacks.forEach((sack, index) => {
      const sackSet = sackSets[index];
      const item = sack[p];

      if (sackSet.has(item)) sackSet.delete(item);
      sackSet.add(item);

      if (itemSet.has(item)) return item;
      itemSet.add(item);
    });
  }
  throw new Error("no common item");
};

// test
const firstGroup = getGroups(examples, 3)[0];
// console.log(firstGroup);
console.log(findCommonItem(firstGroup));

// helpers
function letterToInt(letter) {
  const isLower = letter.toLowerCase() == letter;
  const a = "a".charCodeAt(0);
  const A = "A".charCodeAt(0);
  const num = letter.charCodeAt(0);
  return (isLower ? num - a : num - A + 26) + 1;
}

function getSum(numbers) {
  return numbers.reduce((acc, x) => acc + x, 0);
}

function getMin(numbers) {
  return numbers.reduce((currMin, curr) => (curr <= currMin ? curr : currMin));
}
