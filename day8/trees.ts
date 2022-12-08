import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

const treeRows = file.split("\n");
const treeMap = treeRows.map((row) => row.split("").filter((c) => c !== "\r"));
let visibleTrees = 0;

for (let row = 0; row < treeMap.length; row++) {
  innerLoop: for (let column = 0; column < treeMap[0].length; column++) {
    if (column === 0) {
      visibleTrees++;
    } else if (column === treeMap[0].length - 1) {
      visibleTrees++;
    } else if (row === 0) {
      visibleTrees++;
    } else if (row === treeMap.length - 1) {
      visibleTrees++;
    } else {
      let isVisible = true;
      for (let i = column - 1; i >= 0; i--) {
        if (treeMap[row][column] <= treeMap[row][i]) {
          isVisible = false;
          break;
        }
      }
      if (isVisible) {
        visibleTrees++;
        continue innerLoop;
      }
      isVisible = true;
      for (let i = column + 1; i < treeMap[0].length; i++) {
        if (treeMap[row][column] <= treeMap[row][i]) {
          isVisible = false;
        }
      }
      if (isVisible) {
        visibleTrees++;
        continue innerLoop;
      }
      isVisible = true;
      for (let i = row - 1; i >= 0; i--) {
        if (treeMap[row][column] <= treeMap[i][column]) {
          isVisible = false;
        }
      }
      if (isVisible) {
        visibleTrees++;
        continue innerLoop;
      }
      isVisible = true;
      for (let i = row + 1; i < treeMap.length; i++) {
        if (treeMap[row][column] <= treeMap[i][column]) {
          isVisible = false;
          break;
        }
      }
      if (isVisible) {
        visibleTrees++;
        continue innerLoop;
      }
    }
  }
}

console.log("Visible trees: " + visibleTrees);


let highestScenicScore = 0;

for (let row = 0; row < treeMap.length; row++) {
  for (let column = 0; column < treeMap[0].length; column++) {
    if (column === 0 || column === treeMap[0].length - 1 || row === 0 || row === treeMap.length - 1) {
      continue;
    } else {
      let scenicScore1 = 0;
      let scenicScore2 = 0;
      let scenicScore3 = 0;
      let scenicScore4 = 0;
      for (let i = column - 1; i >= 0; i--) {
        if (treeMap[row][column] <= treeMap[row][i]) {
          scenicScore1 = column - i;
          break;
        }
      }
      if (scenicScore1 === 0) {
        scenicScore1 = column;
      }
      for (let i = column + 1; i < treeMap[0].length; i++) {
        if (treeMap[row][column] <= treeMap[row][i]) {
          scenicScore2 = i - column;
          break;
        }
      }
      if (scenicScore2 === 0) {
        scenicScore2 = treeMap[0].length - column - 1;
      }
      for (let i = row - 1; i >= 0; i--) {
        if (treeMap[row][column] <= treeMap[i][column]) {
          scenicScore3 = row - i;
          break;
        }
      }
      if (scenicScore3 === 0) {
        scenicScore3 = row;
      }
      for (let i = row + 1; i < treeMap.length; i++) {
        if (treeMap[row][column] <= treeMap[i][column]) {
          scenicScore4 = i - row;
          break;
        }
      }
      if (scenicScore4 === 0) {
        scenicScore4 = treeMap.length - row - 1;
      }
      const scenicScore = scenicScore1 * scenicScore2 * scenicScore3 * scenicScore4;
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }
}

console.log("Highest scenic score: " + highestScenicScore);
