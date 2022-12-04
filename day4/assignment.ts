import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

let pairs = 0;
let overlap = 0;

for (const line of file.split("\n")) {
  const [first, second] = line.split(",");
  const [firstXString, firstYString] = first.split("-");
  const [secondXString, secondYString] = second.split("-");
  const firstX = parseInt(firstXString);
  const firstY = parseInt(firstYString);
  const secondX = parseInt(secondXString);
  const secondY = parseInt(secondYString);
  if (firstX <= secondX && secondY <= firstY || secondX <= firstX && firstY <= secondY) {
    pairs++;
    overlap++;
  } else if (firstX >= secondX && firstX <= secondY || secondX >= firstX && secondX <= firstY || firstY >= secondX && firstY <= secondY || secondY >= firstX && secondY <= firstY) {
    overlap++;
  }
}

console.log("Pairs:", pairs);
console.log("Overlap:", overlap);