import data from "./data.js";

const exampleData = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

const log = console.log.bind(console);

function difference(array) {
    return array.map((value, index) => typeof(array[index + 1 ]) === "number" && (value - array[index + 1 ])).filter(elem => typeof(elem) === "number");
    // log("difference array: ", differenceArray)
}

function firstPart(data) {
    const dataArray = data.map(elem => elem.split(" "));
    // log(dataArray);
    let total = 0;

    dataArray.map(singleData => {
        // reverse the single data
        const reversedArray = singleData.toReversed().map(elem => Number(elem));
        const valueArray = [reversedArray[0]];
        // log(reversedArray)
        // map through the new reversed data
            // if the next index has a value, minus from current
        let differenceArray = difference(reversedArray)
        valueArray.push(differenceArray[0]);
        let zeroArray = differenceArray.filter(value => value === 0);
        // log("zero array: ", zeroArray)
        // push the new number to an array
        // if all values are 0 add them up to th enew value
        while (differenceArray.length !== zeroArray.length) {
            differenceArray = difference(differenceArray);
            differenceArray[0] && valueArray.push(differenceArray[0]);
            zeroArray = differenceArray.filter(value => value === 0);
            log("difference:", differenceArray, "|  zero: ", zeroArray)
        };
        total += valueArray.reduce((a,b) => a + b);
        // log("value Array", valueArray)
    });
    log("Total: ", total);
};

firstPart(exampleData)
firstPart(data)