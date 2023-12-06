import { timesArray, distancesArray } from "./data.js";

const log = console.log.bind(console)

const singleTime = [7, 15, 30];
const singleDistance = [9, 40, 200];

// // // Part 1

function waysToWin(times, distances) {
    log("Time: ", times, "   Distance: ", distances);
    const winsArray = [];

    times.map((time, index) => {
        let winningTimes = 0;
        for(let i = 0; i <= time; i++) {
            const timeRemaining = time - i;
            const distanceTravelled = timeRemaining * i;
            distanceTravelled > distances[index] && (winningTimes++);
        };
        winsArray.push(winningTimes);
    });
    log("Total wins per race :", winsArray)
    log("Wins multiplied: ", winsArray.reduce((a,b) => a * b));

};

waysToWin(singleTime, singleDistance);
waysToWin(timesArray, distancesArray);