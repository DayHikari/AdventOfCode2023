import {
  seeds,
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap,
} from "./data.js";

// // small data sets
const smallSeeds = "79 14 55 13";

const smallSeedToSoilMap = ["50 98 2", "52 50 48"];

const smallSoilToFertilizerMap = ["0 15 37", "37 52 2", "39 0 15"];

const smallFertilizerToWaterMap = ["49 53 8", "0 11 42", "42 0 7", "57 7 4"];

const smallWaterToLightMap = ["88 18 7", "18 25 70"];

const smallLightToTemperatureMap = ["45 77 23", "81 45 19", "68 64 13"];

const smallTemperatureToHumidityMap = ["0 69 1", "1 0 69"];

const smallHumidityToLocationMap = ["60 56 37", "56 93 4"];

const log = console.log.bind(console);

// // // Part 2
// Functions

function comparison(range, compArray) {
  const newRangeArray = [];
  const newRange = [];

  const lowerValue = range[0];
  const upperValue = range[0] + range[1] - 1;

  compArray.map((compRange) => {
    const numberArray = compRange.split(" ").map((string) => Number(string));
    const lowerCompValue = numberArray[1];
    const upperCompValue = numberArray[1] + numberArray[2] - 1;

    if (lowerValue >= lowerCompValue && upperValue <= upperCompValue) {
      newRangeArray.push([
        lowerValue - lowerCompValue + numberArray[0],
        range[1],
      ]);
    } else if (
      lowerValue >= lowerCompValue &&
      lowerValue <= upperCompValue &&
      upperValue > upperCompValue
    ) {
      const newLowerValue = lowerValue - lowerCompValue + numberArray[0];
      const newLowerRange = upperCompValue - lowerValue + 1;
      const newUpperValue = upperCompValue + 1;
      const newUpperRange = upperValue - upperCompValue;

      newRangeArray.push([newLowerValue, newLowerRange]);
      newRange.push([newUpperValue, newUpperRange]);
    } else if (
      lowerValue < lowerCompValue &&
      upperValue >= lowerCompValue &&
      upperValue <= upperCompValue
    ) {
      const newUpperValue = numberArray[0];
      const newUpperRange = upperValue - lowerCompValue + 1;
      const newLowerValue = lowerValue;
      const newLowerRange = lowerCompValue - lowerValue;

      newRangeArray.push([newUpperValue, newUpperRange]);
      newRange.push([newLowerValue, newLowerRange]);
    } else if (lowerValue < lowerCompValue && upperValue > upperCompValue) {
      const newInnerValue = numberArray[0];
      const newInnerRange = numberArray[2];
      const newLowerValue = lowerValue;
      const newLowerRange = lowerCompValue - lowerValue;
      const newUpperValue = upperCompValue + 1;
      const newUpperRange = upperValue - upperCompValue;

      newRangeArray.push([newInnerValue, newInnerRange]);
      newRange.push([newLowerValue, newLowerRange]);
      newRange.push([newUpperValue, newUpperRange]);
    }
  });
  newRangeArray.length === 0 && newRange.push(range);
  return [newRangeArray, newRange];
}

function numberFinder(seedIndexArray, compArray) {
  const newRangeArray = [];

  seedIndexArray.map((singleRange) => {
    const [forRangeArray, forRange] = comparison(singleRange, compArray);
    newRangeArray.push(...forRangeArray);
    // log("forRange: ", forRange);
    forRange.map((rangeBit) => {
      const [unNeeded, unAltered] = comparison(rangeBit, compArray);
      newRangeArray.push(...unAltered);
    });
  });

  return newRangeArray;
}

// // Main function

function trueLocationFinder(
  seedsString,
  seedSoilArray,
  soilFertilizerArray,
  fertilizerWaterArray,
  waterLighArray,
  lightTempArray,
  tempHumidArray,
  humidLocalArray
) {
  const localArray = [];

  const seedArray = seedsString.split(" ");
  const seedNumberArray = seedArray.map((seed) => Number(seed));
  const seedIndexArray = [];

  for (let i = 0; i < seedArray.length; i += 2) {
    seedIndexArray.push([seedNumberArray[i], seedNumberArray[i + 1]]);
  };
  const soilNumber = numberFinder(seedIndexArray, seedSoilArray);
  const fertilizerNumber = numberFinder(soilNumber, soilFertilizerArray);
  const waterNumber = numberFinder(fertilizerNumber, fertilizerWaterArray);
  const lightNumber = numberFinder(waterNumber, waterLighArray);
  const tempNumber = numberFinder(lightNumber, lightTempArray);
  const humidNumber = numberFinder(tempNumber, tempHumidArray);
  const localNumber = numberFinder(humidNumber, humidLocalArray);
  localNumber.map((localRange) => {
    localArray.push(localRange[0]);
  });


  log("First location: ", localArray.sort((a, b) => a - b)[0]);
}

trueLocationFinder(
  smallSeeds,
  smallSeedToSoilMap,
  smallSoilToFertilizerMap,
  smallFertilizerToWaterMap,
  smallWaterToLightMap,
  smallLightToTemperatureMap,
  smallTemperatureToHumidityMap,
  smallHumidityToLocationMap
);
trueLocationFinder(seeds, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap)

// // // Part 1

// function numberFinder(initialNumber, compArray) {
//     let newValue;

//     compArray.map(string => {
//         const rangeArray = string.split(" ").map(string => Number(string));
//         // log("Single range:", rangeArray)

//         const diff = initialNumber >= rangeArray[1] && initialNumber < rangeArray[1] + rangeArray[2] && initialNumber - rangeArray[1];
//         // diff && log("In range", initialNumber, "of", rangeArray[1], "and",  rangeArray[1]+rangeArray[2])

//         typeof(diff) === "number" && (newValue = rangeArray[0] + diff);
//         // log(typeof(diff))
//     });
//     return newValue ? newValue : initialNumber
//     // log("Soil number", soilNumber)
// }

// function locationFinder (seedsString, seedSoilArray, soilFertilizerArray, fertilizerWaterArray, waterLighArray, lightTempArray, tempHumidArray, humidLocalArray){
//     const localArray =[];

//     const seedArray = seedsString.split(" ");
//     // log("seeds:",seedArray)
//     // log("_________________________________________________________________")

//     seedArray.map(seed => {
//         const seedNumber = Number(seed);
//         // log("Seed number: ", seedNumber)
//         // log("Soil")
//         const soilNumber = numberFinder(seedNumber, seedSoilArray);
//         // log("Seed Number: ", seedNumber, " | Soil number: ", soilNumber)
//         // log("Fert")
//         const fertilizerNumber = numberFinder(soilNumber, soilFertilizerArray);
//         // log("Soil Number: ", soilNumber, " | Fert number: ", fertilizerNumber)
//         // log("Water")
//         const waterNumber = numberFinder(fertilizerNumber, fertilizerWaterArray);
//         // log("Fert Number: ", fertilizerNumber, " | Water number: ", waterNumber)
//         // log("Light")
//         const lightNumber = numberFinder(waterNumber, waterLighArray);
//         // log("Water Number: ", waterNumber, " | Light number: ", lightNumber)
//         // log("Temp")
//         const tempNumber = numberFinder(lightNumber, lightTempArray);
//         // log("Light Number: ", lightNumber, " | Temp number: ", tempNumber)
//         // log("Humid")
//         const humidNumber = numberFinder(tempNumber, tempHumidArray);
//         // log("Temp Number: ", tempNumber, " | Humid number: ", humidNumber)
//         // log("Local")
//         const localNumber = numberFinder(humidNumber, humidLocalArray);
//         // log("Humid Number: ", humidNumber, " | Local number: ", localNumber)
//         localArray.push(localNumber);

//         // log("_________________________________________________________________")
//     });
//     log("Seeds:",seedArray)
//     log("Location array: ", localArray)
//     log("Sorted locations: ", localArray.sort((a, b) => a - b))
//     log("First location: ", localArray.sort((a, b) => a - b)[0])

// }