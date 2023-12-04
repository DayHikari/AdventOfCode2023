// Imports
import data from "./data.js";

// Small daat set
const smallData = [
  "3+...........65..................998.........453...................................845..773.........................307....527...........541",
  "............*..........125.......*...331......*.....................30.76......./...*....*..861.......*.........298*......*.........700.....",
  "................942.......*...874...*......407...558............752......*196.274.240.345...*.....-..105...................164...........466",
  "....+............&.....593...........516............-....=.....*....74.....................377..157................128...........175*.......",
  "....314.750......................497...........258.....549...70.....*....745.....289*418.................351........../..............839....",
];

// 3, 65, 998, 453, 845, 773, 307, 527 = 3971
// 125, 331, 76, 861, 298 = 1691
// 942, 874, 407, 558, 752, 196, 274, 240, 345, 105, 164 = 4299
// 593, 516, 74, 377, 157, 128, 175 = 2020
// 314, 549, 70, 289, 418, 839 = 2479
// 15018

// loop through individual characters to check if a number if next to a symbol
//      Previous and next line with the index the same or +/- 1
//      If yes, push index of the line and the number to an array/object
// Create new array/object of the numbers and their starting index
//      Compare the two arrays to find the matches and push to a third list of which the total can be summed

function numberFinder(dataSet) {
  // Empty object to store numbers and their indexes
  const numberArray = [];

  // Map through the data set and push numbers to numberArray
  dataSet.map((elem, index) => {
    // Find the numbers in the string
    const numbers = elem.match(/\d+/g);
    // console.log(numbers)

    numbers.map((number) => {
      let passed = false;

      const numberIndex = elem.match(number).index;
      // console.log(numberIndex, number)
        // 
      const prevCharacter = elem[numberIndex - 1];
    //   prevCharacter !== "." && prevCharacter !== undefined && prevCharacter.match(/[0-9]/) && (passed = true);
      prevCharacter &&
        prevCharacter.match(/[\*|\+|\&|\=|\-|\/|\@|\%|\$|\#]/) &&
        (passed = true);

      const nextCharacter = elem[numberIndex + number.length];
      nextCharacter &&
        nextCharacter.match(/[\*|\+|\&|\=|\-|\/|\@|\%|\$|\#]/) &&
        (passed = true);

      const sliceStart = numberIndex - 1 < 0 ? numberIndex : numberIndex - 1;
      const sliceEnd = numberIndex + number.length + 1;

      const belowCharacters =
        dataSet[index + 1] && dataSet[index + 1].slice(sliceStart, sliceEnd);
      belowCharacters &&
        belowCharacters.match(/[\*|\+|\&|\=|\-|\/|\@|\%|\$|\#]/) &&
        (passed = true);
        

      const aboveCharacters =
        dataSet[index - 1] && dataSet[index - 1].slice(sliceStart, sliceEnd);
      aboveCharacters &&
        aboveCharacters.match(/[\*|\+|\&|\=|\-|\/|\@|\%|\$|\#]/) &&
        (passed = true);

      passed && numberArray.push(Number(number));
      // /[*|+|&|=|-|/|@|%|$|#]/
    });
  });

  console.log(numberArray.reduce((a, b) => a + b));
};

numberFinder(smallData);
numberFinder(data);

// // Saved just in case
// function numberFinder(dataSet) {
//     // Empty object to store numbers and their indexes
//     const numberObject = {};

//     // Map through the data set and push numbers to numberArray
//     dataSet.map((elem, index) => {
//       // Find the numbers in the string
//       const numbers = elem.match(/\d+/g);

//       // Create an empty array for the indexes
//       const indexes = [];

//       // Find the starting number of the numbers
//       numbers.map((e, i) => {
//         indexes.push(elem.match(e).index);
//       });

//       // Create the object key
//       numberObject[`${index}`] = [];

//       // Loop through the numbers and indexes and push them to the number object
//       for (let i = 0; i < numbers.length; i++) {
//         numberObject[`${index}`].push([indexes[i], numbers[i]]);
//       }
//     });

//     // Return the numberObject
//     //   return numberObject;
//     console.log(numberObject);
//   }

// // Function to find the part numbers
// function finder(dataSet) {
//   // Empty array for total numbers
//   const totalArray = [];
//   // Empty objects to storeindexes
//   const numberIndexObject = {};
//   const symbolIndexObject = {};

//   // Length of the data
//   const dataLength = dataSet.length;

//   // map through the dataset array
//   dataSet.map((elem, index) => {
//     // Split the string into an array
//     const splitArray = elem.split("");

//     // Loop through the characters
//     for (let i = 0; i < splitArray.length; i++) {
//       // Checks if the character is a number
//       if (elem[i].match(/[0-9]/) !== null) {
//         // Creates an array in the object with the index of the elem as the key
//         !numberIndexObject[`${index}`] && (numberIndexObject[`${index}`] = []);

//         // Pushes the index of the character ot the array
//         numberIndexObject[`${index}`].push(i);
//       } else if (elem[i].match(/[*|+|&|=|-|/|@|%|$|#]/) !== null) {
//         // Creates an array in the object with the index of the elem as the key
//         !symbolIndexObject[`${index}`] && (symbolIndexObject[`${index}`] = []);

//         // Push the symbol index to the array
//         symbolIndexObject[`${index}`].push(i);
//       }
//     }
//   });
//   //   console.log("numbers: ", numberIndexObject);
//   //   console.log("symbols: ", symbolIndexObject);

//   // Object containing part number indexes
//   const partIndexObject = {};
//   // For loop to be used to loop through each key in the numberIndexObject
//   for (let i = 0; i < dataLength; i++) {
//     // If symbolIndexObject[i] exists statement
//     if (symbolIndexObject[i]) {
//       // Map through each key in the numberIndexObject
//       numberIndexObject[i].map((elem) => {
//         // Loop through each value in the symbolIndexObject
//         for (let j = 0; j < symbolIndexObject[i].length; j++) {
//           // If the following character is a symbol
//           if (elem + 1 === symbolIndexObject[i][j]) {
//             !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//             partIndexObject[`${i}`].push(elem);
//           }

//           // If the previous character is a symbol
//           if (elem - 1 === symbolIndexObject[i][j]) {
//             !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//             partIndexObject[`${i}`].push(elem);
//           }

//           // If statement to skip the first line
//           if (i !== 0) {
//             if (symbolIndexObject[i - 1]) {
//               // If the character directly above is a symbol
//               if (elem === symbolIndexObject[i - 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }

//               // If the character directly above and right is a symbol
//               if (elem + 1 === symbolIndexObject[i - 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }

//               // If the character directly above and left is a symbol
//               if (elem - 1 === symbolIndexObject[i - 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }
//             }
//           }

//           // If statement to skip the last line
//           if (i !== dataLength - 1) {
//             if (symbolIndexObject[i + 1]) {
//               // If the character directly below is a symbol
//               if (elem === symbolIndexObject[i + 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }

//               // If the character directly below and right is a symbol
//               if (elem + 1 === symbolIndexObject[i + 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }

//               // If the character directly below and left is a symbol
//               if (elem - 1 === symbolIndexObject[i + 1][j]) {
//                 !partIndexObject[`${i}`] && (partIndexObject[`${i}`] = []);
//                 partIndexObject[`${i}`].push(elem);
//               }
//             }
//           }
//         }
//       });
//       // This one
//     }
//   }
//   // // At this point I have an array of indexes that are part numbers

//   // Call the number finder function and set to a variable
//   const numberObject = numberFinder(dataSet);

//   // Object to contain the pushed number info
//   const pushedNumbersObject = {};

//   // Loop through partIndexObject and numberObject
//   for (let i = 0; i < dataLength; i++) {
//     if (partIndexObject[i]) {
//       // Map through each index in partIndexObject key
//       // // // May be an issue later if the "i" is missing from the partIndexObject
//       partIndexObject[i].map((elem) => {
//         numberObject[i].map((e) => {
//           // If the number length is 3, 2 or 1
//           if (e[1].length === 3) {
//             if (e[0] === elem || e[0] + 1 === elem || e[0] + 2 === elem) {
//               // If the line doesn't have a key, make one
//               !pushedNumbersObject[i] && (pushedNumbersObject[i] = []);

//               // Set the number to a number
//               const number = Number(e[1]);

//               // Variable to determine if the number if present
//               let present = false;

//               // Check if the number is already in the array
//               pushedNumbersObject[i].map((num) => {
//                 num === number && (present = true);
//               });
//               !present && totalArray.push(number);
//             }
//           } else if (e[1].length === 2) {
//             if (e[0] === elem || e[0] + 1 === elem) {
//               // If the line doesn't have a key, make one
//               !pushedNumbersObject[i] && (pushedNumbersObject[i] = []);

//               // Set the number to a number
//               const number = Number(e[1]);

//               // Variable to determine if the number if present
//               let present = false;

//               // Check if the number is already in the array
//               pushedNumbersObject[i].map((num) => {
//                 num === number && (present = true);
//               });
//               !present && totalArray.push(number);
//             }
//           } else {
//             if (e[0] === elem) {
//               // If the line doesn't have a key, make one
//               !pushedNumbersObject[i] && (pushedNumbersObject[i] = []);

//               // Set the number to a number
//               const number = Number(e[1]);

//               // Variable to determine if the number if present
//               let present = false;

//               // Check if the number is already in the array
//               pushedNumbersObject[i].map((num) => {
//                 num === number && (present = true);
//               });
//               !present && totalArray.push(number);
//             }
//           }
//         });
//       });
//     }
//   }
//   console.log(totalArray.reduce((a, b) => a + b));
// }

// finder(smallData);
// finder(data);
