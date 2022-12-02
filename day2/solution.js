import { readFile } from "node:fs/promises";

const input = await readFile("./input.txt", "utf-8");
const rounds = input.split(/\n/);

const shape = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcome = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,
  "B X": 0,
  "B Y": 3,
  "B Z": 6,
  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

const score1 = rounds.reduce((score, round) => {
  const [opponent, me] = round.split(" ");

  const outcomeScore = outcome[round];
  const shapeScore = shape[me];

  return Number(score) + Number(outcomeScore) + Number(shapeScore);
}, 0);
console.log(score1);

const outcome2 = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

// A rock 1, B paper 2, C scissors 3

const shape2 = {
  "A X": 3,
  "A Y": 1,
  "A Z": 2,

  "B X": 1,
  "B Y": 2,
  "B Z": 3,

  "C X": 2,
  "C Y": 3,
  "C Z": 1,
};

const score2 = rounds.reduce((score, round) => {
    const [opponent, me] = round.split(" ");
  
    const shapeScore = shape2[round];
    const outcomeScore = outcome2[me];
  
    return Number(score) + Number(outcomeScore) + Number(shapeScore);
  }, 0);
  console.log(score2);
