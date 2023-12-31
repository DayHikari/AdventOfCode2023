import data from "./data.js";

const exampleData = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];

const exampleTwoData = [
  "...........",
  ".S-------7.",
  ".|F-----7|.",
  ".||OOOOO||.",
  ".||OOOOO||.",
  ".|L-7OF-J|.",
  ".|..|O|..|.",
  ".L--JOL--J.",
  ".....O.....",
];

const smallExample = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];

const largeExample = [
  ".F----7F7F7F7F-7....",
  ".|F--7||||||||FJ....",
  ".||.FJ||||||||L7....",
  "FJL7L7LJLJ||LJ.L-7..",
  "L--J.L7...LJS7F-7L7.",
  "....F-J..F7FJ|L7L7L7",
  "....L7.F7||L7|.L7L7|",
  ".....|FJLJ|FJ|F7|.LJ",
  "....FJL-7.||.||||...",
  "....L---J.LJ.LJLJ..."
];

const log = console.log.bind(console);

// // Part 2
/* 
    - Columns are always even numbered
    - Create an array of indexes of locations
    - Sort into an array of row arrays
    - Map through the rows
        - If the odd index (e.g. 1) - even index (e.g. 0) isn't one then
            - Loop through the gap between and coun thow many "."
*/

const initialStep = (splitPipes, startPosition) => {
  let nextPosition = [];
  if (splitPipes[startPosition[0] - 1][startPosition[1]] !== undefined) {
    switch (splitPipes[startPosition[0] - 1][startPosition[1]]) {
      case "F":
        nextPosition.length === 0 &&
          (nextPosition = [
            "F",
            "L",
            startPosition[0] - 1,
            startPosition[1] + 1,
            startPosition[0] - 1,
            startPosition[1],
          ]);
        break;
      case "7":
        nextPosition.length === 0 &&
          (nextPosition = [
            "7",
            "R",
            startPosition[0] - 1,
            startPosition[1] - 1,
            startPosition[0] - 1,
            startPosition[1],
          ]);
        break;
      case "|":
        nextPosition.length === 0 &&
          (nextPosition = [
            "|",
            "B",
            startPosition[0] - 2,
            startPosition[1],
            startPosition[0] - 1,
            startPosition[1],
          ]);
        break;
      default:
        break;
    }
  }
  if (splitPipes[startPosition[0]][startPosition[1] + 1] !== undefined) {
    switch (splitPipes[startPosition[0]][startPosition[1] + 1]) {
      case "J":
        nextPosition.length === 0 &&
          (nextPosition = [
            "J",
            "B",
            startPosition[0] - 1,
            startPosition[1] + 1,
            startPosition[0],
            startPosition[1] + 1,
          ]);
        break;
      case "7":
        nextPosition.length === 0 &&
          (nextPosition = [
            "7",
            "A",
            startPosition[0] + 1,
            startPosition[1] + 1,
            startPosition[0],
            startPosition[1] + 1,
          ]);
        break;
      case "-":
        nextPosition.length === 0 &&
          (nextPosition = [
            "-",
            "L",
            startPosition[0],
            startPosition[1] + 2,
            startPosition[0],
            startPosition[1] + 1,
          ]);
        break;
      default:
        break;
    }
  }
  if (splitPipes[startPosition[0] + 1][startPosition[1]] !== undefined) {
    switch (splitPipes[startPosition[0] + 1][startPosition[1]]) {
      case "J":
        nextPosition.length === 0 &&
          (nextPosition = [
            "J",
            "R",
            startPosition[0] + 1,
            startPosition[1] - 1,
            startPosition[0] + 1,
            startPosition[1],
          ]);
        break;
      case "L":
        nextPosition.length === 0 &&
          (nextPosition = [
            "L",
            "L",
            startPosition[0] + 1,
            startPosition[1] + 1,
            startPosition[0] + 1,
            startPosition[1],
          ]);
        break;
      case "|":
        nextPosition.length === 0 &&
          (nextPosition = [
            "|",
            "A",
            startPosition[0] + 2,
            startPosition[1],
            startPosition[0] + 1,
            startPosition[1],
          ]);
        break;
      default:
        break;
    }
  }
  if (splitPipes[startPosition[0]][startPosition[1] - 1] !== undefined) {
    switch (splitPipes[startPosition[0]][startPosition[1] - 1]) {
      case "F":
        nextPosition.length === 0 &&
          (nextPosition = [
            "F",
            "A",
            startPosition[0] + 1,
            startPosition[1] - 1,
            startPosition[0],
            startPosition[1] - 1,
          ]);
        break;
      case "L":
        nextPosition.length === 0 &&
          (nextPosition = [
            "L",
            "B",
            startPosition[0] - 1,
            startPosition[1] - 1,
            startPosition[0],
            startPosition[1] - 1,
          ]);
        break;
      case "-":
        nextPosition.length === 0 &&
          (nextPosition = [
            "-",
            "R",
            startPosition[0],
            startPosition[1] - 2,
            startPosition[0],
            startPosition[1] - 1,
          ]);
        break;
      default:
        break;
    }
  }
  return nextPosition;
};

const nextStepFinder = (splitPipes, nextPosition) => {
  let nextStep = [];

  switch (splitPipes[nextPosition[2]][nextPosition[3]]) {
    case "F":
      nextPosition[1] === "R"
        ? (nextStep = ["F", "A", nextPosition[2] + 1, nextPosition[3]])
        : (nextStep = ["F", "L", nextPosition[2], nextPosition[3] + 1]);
      break;
    case "-":
      nextPosition[1] === "R"
        ? (nextStep = ["-", "R", nextPosition[2], nextPosition[3] - 1])
        : (nextStep = ["-", "L", nextPosition[2], nextPosition[3] + 1]);
      break;
    case "7":
      nextPosition[1] === "L"
        ? (nextStep = ["7", "A", nextPosition[2] + 1, nextPosition[3]])
        : (nextStep = ["7", "R", nextPosition[2], nextPosition[3] - 1]);
      break;
    case "|":
      nextPosition[1] === "A"
        ? (nextStep = ["|", "A", nextPosition[2] + 1, nextPosition[3]])
        : (nextStep = ["|", "B", nextPosition[2] - 1, nextPosition[3]]);
      break;
    case "J":
      nextPosition[1] === "A"
        ? (nextStep = ["J", "R", nextPosition[2], nextPosition[3] - 1])
        : (nextStep = ["J", "B", nextPosition[2] - 1, nextPosition[3]]);
      break;
    case "L":
      nextPosition[1] === "A"
        ? (nextStep = ["L", "L", nextPosition[2], nextPosition[3] + 1])
        : (nextStep = ["L", "B", nextPosition[2] - 1, nextPosition[3]]);
      break;
    case "S":
      nextStep = ["S"];
      break;
  }

  return nextStep;
};

const secondPart = (pipes) => {
  const splitPipes = pipes.map((elem) => elem.split(""));
  // log("Split pipe array: ", splitPipes);

  const startPosition = [];

  splitPipes.map((line, index) => {
    line.map((section, secIndex) => {
      section === "S" && startPosition.push(index, secIndex);
    });
  });
  log("Start position: ", startPosition);

  const indexArray = [];

  let nextPosition = initialStep(splitPipes, startPosition);
  //   log(nextPosition);
  indexArray.push(
    [nextPosition[4], nextPosition[5]],
    [nextPosition[2], nextPosition[3]]
  );
  //   log("Index array: ", indexArray)

  let steps = 1;

  while (nextPosition[0] !== "S") {
    steps += 1;
    nextPosition = nextStepFinder(splitPipes, nextPosition);
    indexArray.push([nextPosition[2], nextPosition[3]]);
    // log(nextPosition);
  }
    log("Index array: ", indexArray);

  const sortedIndexArray = indexArray
    .filter((elem) => elem[0] !== undefined)
    .sort((a, b) => {
      if (a[0] == b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
  //   log("Sorted index array: ", sortedIndexArray);

  const rowArray = [];
  sortedIndexArray.map((position) => {
    if (rowArray.length !== 0) {
      if (position[0] === rowArray[rowArray.length - 1][0][0]) {
        rowArray[rowArray.length - 1].push(position);
      } else {
        rowArray.push([position]);
      }
    } else {
      rowArray.length === 0 && rowArray.push([position]);
    }
  });
  //   log("Row array: ", rowArray);

  let count = 0;
  rowArray.map((row) => {
    if (row.length % 2 === 0) {
      // log("Row", row);
      for (let i = 0; i < row.length - 1; i += 2) {
        const difference = row[i + 1][1] - row[i][1];
        if (difference !== 1) {
          //   log("Difference: ", difference)
          for (let j = 0; j < difference; j++) {
            // log("Checked location: ", splitPipes[row[i][0]][row[i][1] + j])
            if (splitPipes[row[i][0]][row[i][1] + j] === ".") {
              count++;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < row.length - 1; i += 2) {
        if (row[i + 1] !== undefined) {
          const difference = row[i + 1][1] - row[i][1];
          if (difference !== 1) {
            // log("Difference: ", difference)
            for (let j = 0; j < difference; j++) {
              if (splitPipes[row[i][0]][row[i][1] + j] === ".") {
                count++;
              }
            }
          }
        }
      }
    }
  });
  log("Count: ", count);
  //   log("Steps: ", steps);
  //   log("Furthest: ", steps / 2);
};

secondPart(exampleData);
secondPart(exampleTwoData);
secondPart(data);
secondPart(smallExample);
secondPart(largeExample);

// // Part 1
// const initialStep = (splitPipes, startPosition) => {
//   let nextPosition = [];
//   if (splitPipes[startPosition[0] - 1][startPosition[1]] !== undefined) {
//     switch (splitPipes[startPosition[0] - 1][startPosition[1]]) {
//       case "F":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "F",
//             "L",
//             startPosition[0] - 1,
//             startPosition[1] + 1,
//           ]);
//         break;
//       case "7":
//         nextPosition.length === 0 &&
//           (nextPosition =
//             ["7", "R", startPosition[0] - 1, startPosition[1]] - 1);
//         break;
//       case "|":
//         nextPosition.length === 0 &&
//           (nextPosition = ["|", "B", startPosition[0] - 2, startPosition[1]]);
//         break;
//       default:
//         break;
//     }
//   }
//   if (splitPipes[startPosition[0]][startPosition[1] + 1] !== undefined) {
//     switch (splitPipes[startPosition[0]][startPosition[1] + 1]) {
//       case "J":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "J",
//             "B",
//             startPosition[0] - 1,
//             startPosition[1] + 1,
//           ]);
//         break;
//       case "7":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "7",
//             "A",
//             startPosition[0] + 1,
//             startPosition[1] + 1,
//           ]);
//         break;
//       case "-":
//         nextPosition.length === 0 &&
//           (nextPosition = ["-", "L", startPosition[0], startPosition[1] + 2]);
//         break;
//       default:
//         break;
//     }
//   }
//   if (splitPipes[startPosition[0] + 1][startPosition[1]] !== undefined) {
//     switch (splitPipes[startPosition[0] + 1][startPosition[1]]) {
//       case "J":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "J",
//             "R",
//             startPosition[0] + 1,
//             startPosition[1] - 1,
//           ]);
//         break;
//       case "L":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "L",
//             "L",
//             startPosition[0] + 1,
//             startPosition[1] + 1,
//           ]);
//         break;
//       case "|":
//         nextPosition.length === 0 &&
//           (nextPosition = ["|", "A", startPosition[0] + 2, startPosition[1]]);
//         break;
//       default:
//         break;
//     }
//   }
//   if (splitPipes[startPosition[0]][startPosition[1] - 1] !== undefined) {
//     switch (splitPipes[startPosition[0]][startPosition[1] - 1]) {
//       case "F":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "F",
//             "A",
//             startPosition[0] + 1,
//             startPosition[1] - 1,
//           ]);
//         break;
//       case "L":
//         nextPosition.length === 0 &&
//           (nextPosition = [
//             "L",
//             "B",
//             startPosition[0] - 1,
//             startPosition[1] - 1,
//           ]);
//         break;
//       case "-":
//         nextPosition.length === 0 &&
//           (nextPosition = ["-", "R", startPosition[0], startPosition[1] - 2]);
//         break;
//       default:
//         break;
//     }
//   }
//   return nextPosition;
// };

// const nextStepFinder = (splitPipes, nextPosition) => {
//   let nextStep = [];

//   switch (splitPipes[nextPosition[2]][nextPosition[3]]) {
//     case "F":
//       nextPosition[1] === "R"
//         ? (nextStep = ["F", "A", nextPosition[2] + 1, nextPosition[3]])
//         : (nextStep = ["F", "L", nextPosition[2], nextPosition[3] + 1]);
//       break;
//     case "-":
//       nextPosition[1] === "R"
//         ? (nextStep = ["-", "R", nextPosition[2], nextPosition[3] - 1])
//         : (nextStep = ["-", "L", nextPosition[2], nextPosition[3] + 1]);
//       break;
//     case "7":
//       nextPosition[1] === "L"
//         ? (nextStep = ["7", "A", nextPosition[2] + 1, nextPosition[3]])
//         : (nextStep = ["7", "R", nextPosition[2], nextPosition[3] - 1]);
//       break;
//     case "|":
//       nextPosition[1] === "A"
//         ? (nextStep = ["|", "A", nextPosition[2] + 1, nextPosition[3]])
//         : (nextStep = ["|", "B", nextPosition[2] - 1, nextPosition[3]]);
//       break;
//     case "J":
//       nextPosition[1] === "A"
//         ? (nextStep = ["J", "R", nextPosition[2], nextPosition[3] - 1])
//         : (nextStep = ["J", "B", nextPosition[2] - 1, nextPosition[3]]);
//       break;
//     case "L":
//       nextPosition[1] === "A"
//         ? (nextStep = ["L", "L", nextPosition[2], nextPosition[3] + 1])
//         : (nextStep = ["L", "B", nextPosition[2] - 1, nextPosition[3]]);
//       break;
//     case "S":
//       nextStep = ["S"];
//       break;
//   }

//   return nextStep;
// };

// const firstPart = (pipes) => {
//   const splitPipes = pipes.map((elem) => elem.split(""));
// //   log("Split pipe array: ", splitPipes);

//   const startPosition = [];

//   splitPipes.map((line, index) => {
//     line.map((section, secIndex) => {
//       section === "S" && startPosition.push(index, secIndex);
//     });
//   });
//   log("Start position: ", startPosition);

//   let nextPosition = initialStep(splitPipes, startPosition);
// //   log("Next position", nextPosition);

//   let steps = 1;

//   while (nextPosition[0] !== "S") {
//     steps += 1;
//     nextPosition = nextStepFinder(splitPipes, nextPosition);
//     // log(nextPosition);
//   };

//   log("Steps: ", steps);
//   log("Furthest: ", steps/2)
// };

// firstPart(exampleData);
// firstPart(data);
