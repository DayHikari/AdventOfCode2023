import { directionData, locationData } from "./data.js";

const log = console.log.bind(console);

const smallDirectionData = "LLR";

const smallLocationData = [
  "AAA = (BBB, BBB)",
  "AAX = (X1A, 6GZ)",
  "BBB = (AAA, ZZZ)",
  "X1A = (AAX, AAX)",
  "ZZZ = (ZZZ, ZZZ)",
  "6GZ = (6GZ, 6GZ)",
];


// // // Part 2

function multiDirectionGuide(directions, locations) {
    const directionArray = directions.split("");
  
    const locationArray = locations.map((elem, index) => {
      const firstSplit = elem.split(" ");
      const firstLocation = firstSplit[0];
      const secondLocation = firstSplit[2].substring(1, 4);
      const thirdLocation = firstSplit[3].substring(0, 3);
      return [firstLocation, secondLocation, thirdLocation];
    });

    // log("Location array: ", locationArray)
    const currentLocationArray = locationArray.map((elem) =>  elem[0].charAt(2) === "A" && elem[0]).filter(elem => elem !== false)
           log("Current Location array: ", currentLocationArray)

  
    let stepsTaken = 0;
    const finalLocationArray = []
  
    while (finalLocationArray.length !== currentLocationArray.length) {
      directionArray.map((direction) => {
        const locationIndex = direction === "L" ? 1 : 2;
  
        const newLocationArray = [];
        // log("Current Location array: ", currentLocationArray)
        currentLocationArray.map((currentLocation) => {
            locationArray.map(locationInfo => {
                if (currentLocation === locationInfo[0]){
                    // log("Current Location: ", currentLocation, "Location info: ", locationInfo)
                    const newLocation = locationInfo[locationIndex]
                    // log("New location : ", newLocation);
                    newLocationArray.push(newLocation)
                }

            })

        });
        // log("New location array: ", newLocationArray)
        stepsTaken++
        newLocationArray.map((elem, index) => {currentLocationArray[index] = elem})
        const finalLocations = currentLocationArray.filter(elem => elem.charAt(2) === "Z")
        // log("Final locations: ", finalLocations)
        finalLocations.map(elem => finalLocationArray.push(elem));
        // log("Final location array:", finalLocationArray)
        
      });

    }
  
    log("Final location array: ", finalLocationArray);
    log("Number of steps taken: ", stepsTaken);
  }

multiDirectionGuide(smallDirectionData, smallLocationData);
multiDirectionGuide(directionData, locationData)



// // // Part 1

// function directionGuide(directions, locations) {
//   const directionArray = directions.split("");

//   const locationArray = locations.map((elem) => {
//     const firstSplit = elem.split(" ");
//     const firstLocation = firstSplit[0];
//     const secondLocation = firstSplit[2].substring(1, 4);
//     const thirdLocation = firstSplit[3].substring(0, 3);
//     return [firstLocation, secondLocation, thirdLocation];
//   });

//   let currentLocation = "AAA";
//   let stepsTaken = 0;

//   while (currentLocation !== "ZZZ") {
//     directionArray.map((direction) => {
//       const locationIndex = direction === "L" ? 1 : 2;

//       let newLocation;
//       locationArray.map((locationInstructions) => {
//         if (locationInstructions[0] === currentLocation) {
//           newLocation = locationInstructions[locationIndex];
//         }
//       });

//       currentLocation = newLocation;
//       stepsTaken++
//     });
//   }

//   log("Final location: ", currentLocation);
//   log("Number of steps taken: ", stepsTaken)
// }

// directionGuide(smallDirectionData, smallLocationData);
// directionGuide(directionData, locationData);
