import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

// Part 1
let score = 0;

for (const line of file.split("\n")) {
  const [elf, myself] = line.split(" ");
  if (myself[0] === "X") {
    score += 1;
    if (elf === "A") {
      score += 3;
    } else if (elf === "B") {
      score += 0;
    } else if (elf === "C") {
      score += 6;
    }
  } else if (myself[0] === "Y") {
    score += 2;
    if (elf === "A") {
      score += 6;
    } else if (elf === "B") {
      score += 3;
    } else if (elf === "C") {
      score += 0;
    }
  } else if (myself[0] === "Z") {
    score += 3;
    if (elf === "A") {
      score += 0;
    } else if (elf === "B") {
      score += 6;
    } else if (elf === "C") {
      score += 3;
    }
  }
}

console.log('Score:', score);

// Part 2
let score2 = 0;

for (const line of file.split("\n")) {
  const [elf, myself] = line.split(" ");
  if (myself[0] === "X") {
    score2 += 0;
    if (elf === "A") {
      score2 += 3;
    } else if (elf === "B") {
      score2 += 1;
    } else if (elf === "C") {
      score2 += 2;
    }
  } else if (myself[0] === "Y") {
    score2 += 3;
    if (elf === "A") {
      score2 += 1;
    } else if (elf === "B") {
      score2 += 2;
    } else if (elf === "C") {
      score2 += 3;
    }
  } else if (myself[0] === "Z") {
    score2 += 6;
    if (elf === "A") {
      score2 += 2;
    } else if (elf === "B") {
      score2 += 3;
    } else if (elf === "C") {
      score2 += 1;
    }
  }
}

console.log('Score2:', score2);