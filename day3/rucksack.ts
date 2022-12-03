import { readFileSync } from "fs";
import { exit } from "process";

const file = readFileSync("input.txt", "utf8");

// Part 1
let sum = 0;

for (const line of file.split("\n")) {
  const rucksack1 = line.slice(0, line.length / 2);
  const rucksack2 = line.slice(line.length / 2);
  let foundMatch = false;
  const rucksack1Items = rucksack1.split("");
  for (let i = 0; !foundMatch && i < rucksack1Items.length; i++) {
    if (rucksack2.includes(rucksack1Items[i])) {
      foundMatch = true;
      const priority = rucksack1Items[i].charCodeAt(0) - 38;
      if (priority <= 52) {
        sum += priority;
      } else {
        sum += priority - 58;
      }
    }
  };
}

console.log("Sum:", sum);

// Part 2
let sum2 = 0;

const sacks = file.split("\n");
for (let i = 0; i < sacks.length; i += 3) {
  const rucksack1 = sacks[i];
  const rucksack2 = sacks[i + 1];
  const rucksack3 = sacks[i + 2];
  let foundMatch = false;
  const rucksack1Items = rucksack1.split("");
  for (let j = 0; !foundMatch && j < rucksack1Items.length; j++) {
    if (rucksack2.includes(rucksack1Items[j]) && rucksack3.includes(rucksack1Items[j])) {
      foundMatch = true;
      const priority = rucksack1Items[j].charCodeAt(0) - 38;
      if (priority <= 52) {
        sum2 += priority;
      } else {
        sum2 += priority - 58;
      }
    }
  };
}

console.log("Sum2:", sum2);