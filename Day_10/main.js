import data from "./data.js";

const exampleData = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];

const log = console.log.bind(console);

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
          ]);
        break;
      case "7":
        nextPosition.length === 0 &&
          (nextPosition =
            ["7", "R", startPosition[0] - 1, startPosition[1]] - 1);
        break;
      case "|":
        nextPosition.length === 0 &&
          (nextPosition = ["|", "B", startPosition[0] - 2, startPosition[1]]);
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
          ]);
        break;
      case "7":
        nextPosition.length === 0 &&
          (nextPosition = [
            "7",
            "A",
            startPosition[0] + 1,
            startPosition[1] + 1,
          ]);
        break;
      case "-":
        nextPosition.length === 0 &&
          (nextPosition = ["-", "L", startPosition[0], startPosition[1] + 2]);
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
          ]);
        break;
      case "L":
        nextPosition.length === 0 &&
          (nextPosition = [
            "L",
            "L",
            startPosition[0] + 1,
            startPosition[1] + 1,
          ]);
        break;
      case "|":
        nextPosition.length === 0 &&
          (nextPosition = ["|", "A", startPosition[0] + 2, startPosition[1]]);
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
          ]);
        break;
      case "L":
        nextPosition.length === 0 &&
          (nextPosition = [
            "L",
            "B",
            startPosition[0] - 1,
            startPosition[1] - 1,
          ]);
        break;
      case "-":
        nextPosition.length === 0 &&
          (nextPosition = ["-", "R", startPosition[0], startPosition[1] - 2]);
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

const firstPart = (pipes) => {
  const splitPipes = pipes.map((elem) => elem.split(""));
//   log("Split pipe array: ", splitPipes);

  const startPosition = [];

  splitPipes.map((line, index) => {
    line.map((section, secIndex) => {
      section === "S" && startPosition.push(index, secIndex);
    });
  });
  log("Start position: ", startPosition);

  let nextPosition = initialStep(splitPipes, startPosition);
//   log("Next position", nextPosition);

  let steps = 1;

  while (nextPosition[0] !== "S") {
    steps += 1;
    nextPosition = nextStepFinder(splitPipes, nextPosition);
    // log(nextPosition);
  };

  log("Steps: ", steps);
  log("Furthest: ", steps/2)
};

firstPart(exampleData);
firstPart(data);

