import { timesArray, distancesArray } from "./data.js";

const log = console.log.bind(console);

const timeExample = [7, 15, 30];
const distanceExample = [9, 40, 200];

// // // Part 2

function theWayToWin(times, distances) {
  const trueTime = Number(times.join(""));
  const trueDistance = Number(distances.join(""));
  log("True time: ", trueTime, "|  True distance: ", trueDistance);

  const halfTime = Math.floor(trueTime / 2);

  const sortArray = [halfTime, Math.floor(halfTime / 2)];
  log(sortArray);


  while (
    sortArray[0] - sortArray[1] !== 1 &&
    sortArray[0] - sortArray[1] !== -1 &&
    sortArray[0] - sortArray[1] !== 0
  ) {
    // log(sortArray);
    const timeRemaining = trueTime - sortArray[1];
    const distanceTravelled = timeRemaining * sortArray[1];
    if (distanceTravelled >= trueDistance) {
      // log("Far enough");
      sortArray[0] = sortArray[1];
      sortArray[1] = Math.floor(sortArray[1] / 2);
    } else {
      // log("Not far enough");
      sortArray[1] =
        sortArray[0] - Math.ceil((sortArray[0] - sortArray[1]) / 2);
    }
  }

  log("While finished");
  log("Final sort array:", sortArray);

  const lowestWin =
    (trueTime - sortArray[1]) * sortArray[1] > trueDistance
      ? sortArray[1]
      : sortArray[0];
  log("Lowest win: ", lowestWin);
  const highestWin =
    (halfTime - lowestWin + halfTime + 1) *
      (trueTime - (halfTime - lowestWin + halfTime) - 1) >
    trueDistance
      ? halfTime - lowestWin + halfTime + 1
      : (halfTime - lowestWin + halfTime) *
          (trueTime - (halfTime - lowestWin + halfTime)) >
        trueDistance
      ? halfTime - lowestWin + halfTime
      : halfTime - lowestWin + halfTime - 1;
  log("highest win: ", highestWin);
  log("Number of wins =", highestWin - lowestWin + 1)

}

// theWayToWin(timeExample, distanceExample);
// theWayToWin([3, 0], [20, 0]);
theWayToWin(timesArray, distancesArray)

// // // Part 1

function waysToWin(times, distances) {
  log("Time: ", times, "   Distance: ", distances);
  const winsArray = [];

  times.map((time, index) => {
    let winningTimes = 0;
    for (let i = 0; i <= time; i++) {
      const timeRemaining = time - i;
      const distanceTravelled = timeRemaining * i;
      distanceTravelled > distances[index] && winningTimes++;
    }
    winsArray.push(winningTimes);
  });
  log("Total wins per race :", winsArray);
  log(
    "Wins multiplied: ",
    winsArray.reduce((a, b) => a * b)
  );
}

// waysToWin(timeExample, distanceExample);
// waysToWin(timesArray, distancesArray);
