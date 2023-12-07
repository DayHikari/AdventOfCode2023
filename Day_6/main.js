import { timesArray, distancesArray } from "./data.js";

const log = console.log.bind(console)

const timeExample = [7, 15, 30];
const distanceExample = [9, 40, 200];


// // // Part 2

function theWayToWin (times, distances) {
    const trueTime = Number(times.join(""));
    const trueDistance = Number(distances.join(""));
    log("True time: ", trueTime, "|  True distance: ", trueDistance)

    const halfTime = Math.floor(trueTime/2)

    const sortArray = [halfTime, Math.floor(halfTime/2)];
    log(sortArray)

    while(sortArray[0]-sortArray[1] !== 1 || sortArray[0]-sortArray[1] !== -1) {
        const timeRemaining = trueTime - sortArray[1];
        const distanceTravelled = timeRemaining * sortArray[1];
        if(distanceTravelled <= trueDistance) {
            sortArray[1] = Math.floor(((sortArray[0] - sortArray[1])/2) + sortArray[1]);
        } else {
            const newValue = Math.floor(sortArray[1]-((sortArray[0] - sortArray[1])/2))
            sortArray[0] = sortArray[1];
            sortArray[1] = newValue;
        }
    };
    
    const lowestWin = (trueTime - sortArray[1])*sortArray[1] > distanceTravelled ? sortArray[1] : sortArray[0];
    const highestWin = (timeRemaining - (lowestWin + halfTime + 1))*(lowestWin + halfTime) > distanceTravelled ? (lowestWin + 1) :
                                (timeRemaining - (lowestWin + halfTime))*(lowestWin + halfTime) > distanceTravelled ? lowestWin : lowestWin - 1;
    const numberOfWins = highestWin - lowestWin;
    log(numberOfWins)
}



// theWayToWin(timeExample, distanceExample);















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

// waysToWin(timeExample, distanceExample);
// waysToWin(timesArray, distancesArray);