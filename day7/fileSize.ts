import { readFileSync } from "fs";

type File = {
  name: string;
  size: number;
  parent: Directory | null;
};

type Directory = {
  name: string;
  files: File[];
  subdirectories: Directory[];
  parent: Directory | null;
  size: number;
};

let root: Directory = {
  name: "~",
  files: [],
  subdirectories: [],
  parent: null,
  size: 0,
}
let currentDirectory: Directory = root;

let firstRoot: Directory = {
  name: "/",
  files: [],
  subdirectories: [],
  parent: root,
  size: 0,
}
root.subdirectories.push(firstRoot);

const file = readFileSync("input.txt", "utf-8");

for (const line of file.split("\n")) {
  const command = line.split(" ");
  if (command[0] === "$") {
    if (command[1] === "cd") {
      // cd command
      let directory = command[2];
      if (command[2].includes("\r")) {
        directory = command[2].replace("\r", "");
      }
      if (directory === "..") {
        // cd ..
        currentDirectory = currentDirectory.parent!;
      } else {
        // cd directory
        currentDirectory = currentDirectory.subdirectories.find((dir) => dir.name === directory)!;
      }
    }
  } else {
    // ls output
    if (command[0] === "dir") {
      let directory = command[1];
      if (command[1].includes("\r")) {
        directory = command[1].replace("\r", "");
      }
      const newDirectory: Directory = {
        name: directory,
        files: [],
        subdirectories: [],
        parent: currentDirectory,
        size: 0,
      }
      currentDirectory.subdirectories.push(newDirectory);
    } else {
      const size = parseInt(command[0]);
      let fileName = command[1];
      if (command[1].includes("\r")) {
        fileName = command[1].replace("\r", "");
      }
      const newFile: File = {
        name: fileName,
        size: size,
        parent: currentDirectory,
      }
      currentDirectory.files.push(newFile);
    }
  }
}

// calculate size of each directory
function calculateSize(directory: Directory) {
  for (const file of directory.files) {
    directory.size += file.size;
  }
  for (const subdirectory of directory.subdirectories) {
    calculateSize(subdirectory);
    directory.size += subdirectory.size;
  }
}

calculateSize(root);

// sum all directories with size <= 100000
function sumDirectories(directory: Directory, sum: number) {
  if (directory.size <= 100000) {
    sum += directory.size;
  }
  for (const subdirectory of directory.subdirectories) {
    sum = sumDirectories(subdirectory, sum);
  }
  return sum;
}

console.log("Part 1:", sumDirectories(root, 0));

// Part 2
// delete directory that will free up space
const availableSpace = 70000000 - root.subdirectories[0].size;
const spaceNeededToDelete = 30000000 - availableSpace;
let sizeOfDeletedDirectory = 70000000;

// find directory to delete
function findDirectoryToDelete(directory: Directory) {
  for (const subdirectory of directory.subdirectories) {
    if (subdirectory.size >= spaceNeededToDelete && subdirectory.size <= sizeOfDeletedDirectory) {
      sizeOfDeletedDirectory = subdirectory.size;
    }
    findDirectoryToDelete(subdirectory);
  }
}

findDirectoryToDelete(root);
console.log("Part 2:", sizeOfDeletedDirectory);
