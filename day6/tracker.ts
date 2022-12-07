import { readFileSync } from "fs";

const file = readFileSync("input.txt", "utf8");

const input = file.split("");

// start of packet
let startOfPacket = 4;
let answer;
let found = 0;

while (found < 4 && startOfPacket < input.length) {
  found = 0;
  const front = input.slice(startOfPacket-4, startOfPacket);
  for (let j = startOfPacket-4; j <= startOfPacket; j++) {
    const newFront = front.map(x => {
      if (x === input[j]) {
        return x;
      }
    }).filter(x => x !== undefined);
    if (newFront.length === 1) {
      found++;
    }
  }
  startOfPacket++;
}
answer = startOfPacket - 1;

console.log("Start of Packet:", answer);

// start of message
let startOfMessage = 14;
let answer2;
let found2 = 0;

while (found2 < 14 && startOfMessage < input.length) {
  found2 = 0;
  const front = input.slice(startOfMessage-14, startOfMessage);
  for (let j = startOfMessage-14; j <= startOfMessage; j++) {
    const newFront = front.map(x => {
      if (x === input[j]) {
        return x;
      }
    }).filter(x => x !== undefined);
    if (newFront.length === 1) {
      found2++;
    }
  }
  startOfMessage++;
}
answer2 = startOfMessage - 1;

console.log("Start of Message:", answer2);
