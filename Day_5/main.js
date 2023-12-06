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

function numberFinder(rangeArray, compArray) {
  const newRangeArray = [];
  rangeArray.map((range) => {
    const newRange = []
    log("Finder function range: ", range);
    //   log("Finder function comp array: ", compArray)
    const lowerValue = range[0];
    const upperValue = range[0] + range[1];
      log("Finder function lower value: ", lowerValue)
      log("Finder function upper value: ", upperValue)

    compArray.map(compRange => {
      const numberArray = compRange.split(" ").map((string) => Number(string));
      const lowerCompValue = numberArray[1];
      const upperCompValue = numberArray[1] + numberArray[2];
      
      if(lowerValue > lowerCompValue && upperValue < upperCompValue) {
        newRange.push([(lowerValue - lowerCompValue + numberArray[0]), range[1]])
      } else if(lowerValue > lowerCompValue && lowerValue < upperCompValue && upperValue > upperCompValue) {

      }
      /* Going through the scenarios of what could occur with the range and creating new ranges to be pushed up to the newRangeArray*/
    });

    log("New range: ", newRange);


    });
    
  //     const minMaxArray = [];
  //   const compNumberArray = [];
  //   compArray.map((string) => {
  //     const numberArray = string.split(" ").map((string) => Number(string));
  //     compNumberArray.push(numberArray);
  //     minMaxArray.push(numberArray[1]);
  //     minMaxArray.push(numberArray[1] + numberArray[2] - 1);
  //   });
  //   log("Range array: ", rangeArray);

  //   const compMinValue = minMaxArray.sort((a, b) => a - b)[0];
  //   const compMaxValue = minMaxArray.sort((a, b) => a - b)[
  //     minMaxArray.length - 1
  //   ];
  //     // log("Min and Max array: ", minMaxArray, minMaxArray.sort((a, b) => a - b)[0], minMaxArray.sort((a, b) => a - b)[minMaxArray.length -1])
  //     // log("Min", compMinValue)
  //     // log("Max", compMaxValue)

  //   let withinRange = false;
  //   let partialWithinRange = false;
  //   let surroundingRange = false;

  //   lowerValue >= compMinValue &&
  //     lowerValue <= compMaxValue &&
  //     (withinRange = true);
  //   upperValue >= compMinValue &&
  //     upperValue <= compMaxValue &&
  //     (withinRange = true);
  //   lowerValue >= compMinValue &&
  //     lowerValue <= compMaxValue &&
  //     upperValue > compMaxValue &&
  //     (partialWithinRange = true);
  //   upperValue >= compMinValue &&
  //     upperValue <= compMaxValue &&
  //     lowerValue < compMinValue &&
  //     (partialWithinRange = true);
  //   lowerValue < compMinValue &&
  //     upperValue > compMaxValue &&
  //     (surroundingRange = true);
  // });

  //   !surroundingRange && !partialWithinRange && withinRange ? (range[0] = (range[0] - min))

  //         const diff = initialNumber >= rangeArray[1] && initialNumber < rangeArray[1] + rangeArray[2] && initialNumber - rangeArray[1];
  //         typeof(diff) === "number" && (newValue = rangeArray[0] + diff);

  //   return newValue ? newValue : range;
  /* TODO: Work out how to determine the change in the value. May have to be in the compArray map again to find the comp start value and difference to be added to the change */
  /* TODO: OR map through individual numbers again but just change the local array to not an array and compare the values so that is always just one. */
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
  //   log(seedArray)
  const seedNumberArray = seedArray.map((seed) => Number(seed));
  //   log("Seed Numbers", seedNumberArray);
  const seedIndexArray = [];

  for (let i = 0; i < seedArray.length; i += 2) {
    seedIndexArray.push([seedNumberArray[i], seedNumberArray[i + 1]]);
  }
  //   log("Seed index array: ", seedIndexArray);

  // log("seeds:",seedArray)
  // log("_________________________________________________________________")

  seedIndexArray.map((seedRange) => {
    log("Seed range: ", seedRange);

    const seedRangeLocal = [];

    // log("Seed number: ", seedNumber)
    // log("Soil")
    const soilNumber = numberFinder([seedRange], seedSoilArray);
    // log("Seed Number: ", seedNumber, " | Soil number: ", soilNumber)
    // log("Fert")
    const fertilizerNumber = numberFinder(soilNumber, soilFertilizerArray);
    // log("Soil Number: ", soilNumber, " | Fert number: ", fertilizerNumber)
    log("Water");
    const waterNumber = numberFinder(fertilizerNumber, fertilizerWaterArray);
    // log("Fert Number: ", fertilizerNumber, " | Water number: ", waterNumber)
    // log("Light")
    const lightNumber = numberFinder(waterNumber, waterLighArray);
    // log("Water Number: ", waterNumber, " | Light number: ", lightNumber)
    // log("Temp")
    const tempNumber = numberFinder(lightNumber, lightTempArray);
    // log("Light Number: ", lightNumber, " | Temp number: ", tempNumber)
    // log("Humid")
    const humidNumber = numberFinder(tempNumber, tempHumidArray);
    // log("Temp Number: ", tempNumber, " | Humid number: ", humidNumber)
    // log("Local")
    const localNumber = numberFinder(humidNumber, humidLocalArray);
    // log("Humid Number: ", humidNumber, " | Local number: ", localNumber)
    seedRangeLocal.push(localNumber);

    // log("_________________________________________________________________")

    // log("Seed range local", seedRangeLocal.sort((a, b) => a - b))
    localArray.push(seedRangeLocal.sort((a, b) => a - b)[0]);
  });
  //   log("Seeds:", seedArray);
  // log("Location array: ", localArray);
  //   log(
  //     "Sorted locations: ",
  //     localArray.sort((a, b) => a - b)
  //   );
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
// trueLocationFinder(seeds, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap)

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

// // // Part 1.5 --- Don't use full data on

// function numberFinder(initialNumber, compArray) {
//     let newValue;

//     compArray.map((string) => {
//       const rangeArray = string.split(" ").map((string) => Number(string));
//       // log("Single range:", rangeArray)

//       const diff =
//         initialNumber >= rangeArray[1] &&
//         initialNumber < rangeArray[1] + rangeArray[2] &&
//         initialNumber - rangeArray[1];
//       // diff && log("In range", initialNumber, "of", rangeArray[1], "and",  rangeArray[1]+rangeArray[2])

//       typeof diff === "number" && (newValue = rangeArray[0] + diff);
//       // log(typeof(diff))
//     });
//     return newValue ? newValue : initialNumber;
//     // log("Soil number", soilNumber)
//   }

//   function trueLocationFinder(
//     seedsString,
//     seedSoilArray,
//     soilFertilizerArray,
//     fertilizerWaterArray,
//     waterLighArray,
//     lightTempArray,
//     tempHumidArray,
//     humidLocalArray
//   ) {
//     const localArray = [];

//     const seedArray = seedsString.split(" ");
//     const seedNumberArray = seedArray.map((seed) => Number(seed));
//     //   log("Seed Numbers", seedNumberArray);
//     const seedIndexArray = [];

//     for (let i = 0; i < seedArray.length; i += 2) {
//       seedIndexArray.push([seedNumberArray[i], seedNumberArray[i + 1]]);
//     }
//   //   log("Seed index array: ", seedIndexArray);

//     // log("seeds:",seedArray)
//     // log("_________________________________________________________________")

//     seedIndexArray.map((seedRange) => {

//       // // Testing
//       // const rangeByHundred = Math.floor(seedRange[1] / 100)
//       // console.log(rangeByHundred)

//       // log("Seed range: ", seedRange);
//       const seedArray = [];
//       for (let i = 0; i < seedRange[1]; i++) {
//         try {
//           seedArray.push(seedRange[0] + i);
//         } catch (error) {
//           log("Failed", seedRange[0], seedRange[1], rangeByHundred);
//           return;
//         }
//       }
//       // log("Seed array: ", seedArray);

//       const seedRangeLocal = [];

//       seedArray.map((seedNumber) => {
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
//         seedRangeLocal.push(localNumber);

//         // log("_________________________________________________________________")
//       });
//       // log("Seed range local", seedRangeLocal.sort((a, b) => a - b))
//       localArray.push(seedRangeLocal.sort((a, b) => a - b)[0])

//     });
//     //   log("Seeds:", seedArray);
//       log("Location array: ", localArray);
//     //   log(
//     //     "Sorted locations: ",
//     //     localArray.sort((a, b) => a - b)
//     //   );
//     log("First location: ", localArray.sort((a, b) => a - b)[0]);
//   }

// // // Part 1.5 --- Don't use full data on

// function numberFinder(initialNumber, compArray) {
//   let newValue;

//   compArray.map((string) => {
//     const rangeArray = string.split(" ").map((string) => Number(string));
//     // log("Single range:", rangeArray)

//     const diff =
//       initialNumber >= rangeArray[1] &&
//       initialNumber < rangeArray[1] + rangeArray[2] &&
//       initialNumber - rangeArray[1];
//     // diff && log("In range", initialNumber, "of", rangeArray[1], "and",  rangeArray[1]+rangeArray[2])

//     typeof diff === "number" && (newValue = rangeArray[0] + diff);
//     // log(typeof(diff))
//   });
//   return newValue ? newValue : initialNumber;
//   // log("Soil number", soilNumber)
// }

// function trueLocationFinder(
//   seedsString,
//   seedSoilArray,
//   soilFertilizerArray,
//   fertilizerWaterArray,
//   waterLighArray,
//   lightTempArray,
//   tempHumidArray,
//   humidLocalArray
// ) {
//   let localArray;

//   const seedArray = seedsString.split(" ");
//   const seedNumberArray = seedArray.map((seed) => Number(seed));
//   //   log("Seed Numbers", seedNumberArray);
//   const seedIndexArray = [];

//   for (let i = 0; i < seedArray.length; i += 2) {
//     seedIndexArray.push([seedNumberArray[i], seedNumberArray[i + 1]]);
//   }
// //   log("Seed index array: ", seedIndexArray);

//   // log("seeds:",seedArray)
//   // log("_________________________________________________________________")

//   seedIndexArray.map((seedRange) => {

//     // // Testing
//     // const rangeByHundred = Math.floor(seedRange[1] / 100)
//     // console.log(rangeByHundred)

//     // log("Seed range: ", seedRange);
//     for (let i = 0; i < seedRange[1]; i++) {
//         const seedNumber = seedRange[0] + i;

//       // log("Seed number: ", seedNumber)
//       // log("Soil")
//       const soilNumber = numberFinder(seedNumber, seedSoilArray);
//       // log("Seed Number: ", seedNumber, " | Soil number: ", soilNumber)
//       // log("Fert")
//       const fertilizerNumber = numberFinder(soilNumber, soilFertilizerArray);
//       // log("Soil Number: ", soilNumber, " | Fert number: ", fertilizerNumber)
//       // log("Water")
//       const waterNumber = numberFinder(fertilizerNumber, fertilizerWaterArray);
//       // log("Fert Number: ", fertilizerNumber, " | Water number: ", waterNumber)
//       // log("Light")
//       const lightNumber = numberFinder(waterNumber, waterLighArray);
//       // log("Water Number: ", waterNumber, " | Light number: ", lightNumber)
//       // log("Temp")
//       const tempNumber = numberFinder(lightNumber, lightTempArray);
//       // log("Light Number: ", lightNumber, " | Temp number: ", tempNumber)
//       // log("Humid")
//       const humidNumber = numberFinder(tempNumber, tempHumidArray);
//       // log("Temp Number: ", tempNumber, " | Humid number: ", humidNumber)
//       // log("Local")
//       const localNumber = numberFinder(humidNumber, humidLocalArray);
//       // log("Humid Number: ", humidNumber, " | Local number: ", localNumber)
//       localArray === undefined && (localArray = localNumber);
//       localArray > localNumber && (localArray = localNumber);
//       // log(localArray)

//       // log("_________________________________________________________________")
//     };
//   });
//   //   log("Seeds:", seedArray);
//     log("Location array: ", localArray);
//   //   log(
//   //     "Sorted locations: ",
//   //     localArray.sort((a, b) => a - b)
//   //   );
//   // log("First location: ", localArray.sort((a, b) => a - b)[0]);
// }
