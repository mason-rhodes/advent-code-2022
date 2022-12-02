import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

let calories = 0;
let mostCalories = 0;
let currentElf = 1;
const elves = [];
let mostCaloriesElf = 0;

for (const line of file.split("\n")) {
  if (line.length < 2) {
    console.log(`Elf ${currentElf} has ${calories} calories`);
    elves.push(calories);
    calories = 0;
    currentElf++;
  } else {
    calories += parseInt(line);
    if (calories > mostCalories) {
      mostCalories = calories;
      mostCaloriesElf = currentElf;
    }
  }
}

console.log(`Elf ${mostCaloriesElf} has the most calories: ${mostCalories}`);
console.log(`Top 3 elves: ${elves.sort((a, b) => b - a).slice(0, 3)}`);
console.log(`Total calories for top 3 elves: ${elves.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b)}`);