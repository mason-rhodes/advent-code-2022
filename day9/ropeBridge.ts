import { readFileSync } from "fs";

type Coords = {
  x: number;
  y: number;
}

const file = readFileSync("input.txt", "utf8");

const visited: Coords[] = [{ x: 0, y: 0 }];
const currentHead: Coords = { x: 0, y: 0 };
const currentTail: Coords = { x: 0, y: 0 };

for (const line of file.split("\n")) {
  const [direction, units] = [line[0], parseInt(line.slice(1))];
  const [head, tail] = [currentHead, currentTail];
  for (let i = 0; i < units; i++) {
    switch (direction) {
      case "U":
        head.y++;
        break;
      case "D":
        head.y--;
        break;
      case "L":
        head.x--;
        break;
      case "R":
        head.x++;
        break;
    }
    // check if tail is not adjacent to head
    const distanceX = Math.abs(head.x - tail.x);
    const distanceY = Math.abs(head.y - tail.y);
    if (distanceX > 1 || distanceY > 1) {
      // move tail
      if (head.x > tail.x && head.y > tail.y) {
        tail.x++;
        tail.y++;
      } else if (head.x > tail.x && head.y < tail.y) {
        tail.x++;
        tail.y--;
      } else if (head.x < tail.x && head.y > tail.y) {
        tail.x--;
        tail.y++;
      } else if (head.x < tail.x && head.y < tail.y) {
        tail.x--;
        tail.y--;
      } else if (head.x > tail.x) {
        tail.x++;
      } else if (head.x < tail.x) {
        tail.x--;
      } else if (head.y > tail.y) {
        tail.y++;
      } else if (head.y < tail.y) {
        tail.y--;
      }
    }
    if (!visited.some((v) => v.x === tail.x && v.y === tail.y)) {
      visited.push({ x: tail.x, y: tail.y });
    }
  }
}

console.log("Part 1:", visited.length);


// Part 2
// simulate with 10 knots

const visited1: Coords[] = [{ x: 0, y: 0 }];
const current1: Coords = { x: 0, y: 0 };
const current2: Coords = { x: 0, y: 0 };
const current3: Coords = { x: 0, y: 0 };
const current4: Coords = { x: 0, y: 0 };
const current5: Coords = { x: 0, y: 0 };
const current6: Coords = { x: 0, y: 0 };
const current7: Coords = { x: 0, y: 0 };
const current8: Coords = { x: 0, y: 0 };
const current9: Coords = { x: 0, y: 0 };
const current10: Coords = { x: 0, y: 0 };

for (const line of file.split("\n")) {
  const [direction, units] = [line[0], parseInt(line.slice(1))];
  const [head, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tail] = [
    current1,
    current2,
    current3,
    current4,
    current5,
    current6,
    current7,
    current8,
    current9,
    current10,
  ];
  for (let i = 0; i < units; i++) {
    switch (direction) {
      case "U":
        head.y++;
        break;
      case "D":
        head.y--;
        break;
      case "L":
        head.x--;
        break;
      case "R":
        head.x++;
        break;
    }
    let oldKnot = head;
    for (const knot of [second, third, fourth, fifth, sixth, seventh, eighth, ninth, tail]) {
      // check if tail is not adjacent to head
      const distanceX = Math.abs(oldKnot.x - knot.x);
      const distanceY = Math.abs(oldKnot.y - knot.y);
      if (distanceX > 1 || distanceY > 1) {
        // move tail
        if (oldKnot.x > knot.x && oldKnot.y > knot.y) {
          knot.x++;
          knot.y++;
        } else if (oldKnot.x > knot.x && oldKnot.y < knot.y) {
          knot.x++;
          knot.y--;
        } else if (oldKnot.x < knot.x && oldKnot.y > knot.y) {
          knot.x--;
          knot.y++;
        } else if (oldKnot.x < knot.x && oldKnot.y < knot.y) {
          knot.x--;
          knot.y--;
        } else if (oldKnot.x > knot.x) {
          knot.x++;
        } else if (oldKnot.x < knot.x) {
          knot.x--;
        } else if (oldKnot.y > knot.y) {
          knot.y++;
        } else if (oldKnot.y < knot.y) {
          knot.y--;
        }
      }
      oldKnot = knot;
    }
    if (!visited1.some((v) => v.x === tail.x && v.y === tail.y)) {
      visited1.push({ x: tail.x, y: tail.y });
    }
  }
}

console.log("Part 2:", visited1.length);
