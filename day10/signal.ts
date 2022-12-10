import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

let cycle = 0;
let x = 1;
let signal20 = 0;
let signal60 = 0;
let signal100 = 0;
let signal140 = 0;
let signal180 = 0;
let signal220 = 0;
const spritePosition = Array(40).fill('.');
spritePosition[0] = '#';
spritePosition[1] = '#';
spritePosition[2] = '#';
const screen = Array(240);

const checkStrength = (cycle: number, signal: number) => {
  if (cycle === 20) {
    signal20 = signal * cycle;
  } else if (cycle === 60) {
    signal60 = signal * cycle;
  } else if (cycle === 100) {
    signal100 = signal * cycle;
  } else if (cycle === 140) {
    signal140 = signal * cycle;
  } else if (cycle === 180) {
    signal180 = signal * cycle;
  } else if (cycle === 220) {
    signal220 = signal * cycle;
  }
};

const MoveSprite = (val: number) => {
  spritePosition[x] = '.';
  spritePosition[x + 1] = '.';
  spritePosition[x - 1] = '.';
  x += val;
  spritePosition[x] = '#';
  spritePosition[x + 1] = '#';
  spritePosition[x - 1] = '#';
}

const updateScreen = () => {
  const spriteIndex = cycle % 40;
  screen[cycle] = spritePosition[spriteIndex];
}

for (const line of file.split("\n")) {
  const command = line.split(" ");
  updateScreen();
  cycle++;
  checkStrength(cycle, x);
  if (command.length > 1) {
    const value = parseInt(command[1]);
    updateScreen();
    cycle++;
    checkStrength(cycle, x);
    MoveSprite(value);
  }
}

const signalSum = signal20 + signal60 + signal100 + signal140 + signal180 + signal220;

console.log('Part 1:', signalSum);

console.log('Part 2:');
const row1 = screen.slice(0, 40).join('');
const row2 = screen.slice(40, 80).join('');
const row3 = screen.slice(80, 120).join('');
const row4 = screen.slice(120, 160).join('');
const row5 = screen.slice(160, 200).join('');
const row6 = screen.slice(200, 240).join('');
console.log(row1);
console.log(row2);
console.log(row3);
console.log(row4);
console.log(row5);
console.log(row6);
