import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

// get initial crate state
const lines = file.split("\n");
let splitIndex = 0;

const crates = [] as string[][];

while (lines[splitIndex + 1] !== "\r") {
  const row = lines[splitIndex].split(" ");
  let i = 0;
  let j = 0;
  let crateIndex = 0;
  while (i < row.length) {
    if (row[i] === "\r" && j === 3) {
      if (crates[crateIndex] === undefined) {
        crates[crateIndex] = [];
      }
      crateIndex++;
    }
    if (row[i] === "") {
      j++;
      if (j === 4) {
        if (crates[crateIndex] === undefined) {
          crates[crateIndex] = [];
        }
        crateIndex++;
        j = 0;
      }
    }
    if (row[i] !== "" && row[i] !== "\r") {
      if (crates[crateIndex] === undefined) {
        crates[crateIndex] = [];
      }
      crates[crateIndex].push(row[i].slice(0, 3));
      crateIndex++;
    }
    i++;
  }
  splitIndex++;
}
splitIndex++;

// reverse the crates
const reversedCrates = crates.map((crate) => crate.reverse());
const reversedCrates2 = [] as string[][];
// copy the crates
for (let i = 0; i < reversedCrates.length; i++) {
  reversedCrates2[i] = [];
  for (let j = 0; j < reversedCrates[i].length; j++) {
    reversedCrates2[i][j] = reversedCrates[i][j];
  }
}

// do the commands
const commands = lines.slice(splitIndex + 1, lines.length);

commands.forEach((command) => {
  const line = command.split(" ");
  const amountToMove = parseInt(line[1]);
  const fromCrate = parseInt(line[3]) - 1;
  const toCrate = parseInt(line[5]) - 1;
  for (let i = 0; i < amountToMove; i++) {
    reversedCrates[toCrate].push(reversedCrates[fromCrate].pop()!);
  }
});

console.log("Part 1:");
// print crates on top of each stack
reversedCrates.forEach(crate => {
  console.log(crate[crate.length - 1]);
});

commands.forEach((command) => {
  const line = command.split(" ");
  const amountToMove = parseInt(line[1]);
  const fromCrate = parseInt(line[3]) - 1;
  const toCrate = parseInt(line[5]) - 1;
  const crateBunch = [];
  for (let i = 0; i < amountToMove; i++) {
    crateBunch.push(reversedCrates2[fromCrate].pop()!);
  }
  const newCrates = crateBunch.reverse();
  newCrates.forEach(crate => {
    reversedCrates2[toCrate].push(crate);
  });
  crateBunch.length = 0;
});

console.log("Part 2:");
// print crates on top of each stack
reversedCrates2.forEach(crate => {
  console.log(crate[crate.length - 1]);
});
