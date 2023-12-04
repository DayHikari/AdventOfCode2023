// Imports
import data from "./data.js";

// Small daat set
const smallData = [
  "..........$.............52............602......%........*...105..$.................938...431.............................157......#...310...",
  "...581../...............$.........309.......*...........846.../..718..........568@..*.......*...261...............22.........-852......*....",
  "......*.969.349..354.....................156.666....@................-378..-................632....*..........363*........./......976.871...",
  ".....60.....*.......*....10...@..684#..............225....248.............904..........638$......896....%.................906.926...*.......",
  ".............602.....958.....103..........703......................*81.$.........456.........704.........149...785.2=...........*.87...95...",
];

// First
// 52, 105, 938, 431, 310 = 1836
// 581, 846, 718, 568, 261, 22, 852 = 3848
// 969, 349, 354, 156, 666, 378, 632, 363, 976, 871 = 5714
// 60, 684, 225, 904, 638, 896, 906, 926 = 5239
// 602, 958, 103, 149, 2, 87 = 1901
// 18538

// Second
// n/a
// 156 * 666 (103896), 431 * 632(272392), 310 * 871(270010) = 646298
// 581 * 60(34860), 261 * 896(233856), 363 * 22 (7986) = 276702
// 349 * 602(210098), 354 * 958(339132), 976 * 87(84912) = 634142
// n/a
// 1,557,142

function gearFinder(dataSet) {
  // Empty object to store numbers and their indexes
  const numberArray = [];

  // Map through the data set and push numbers to numberArray
  dataSet.map((elem, index) => {
    // Find the numbers in the string
    const gears = elem.match(/\*+/g);
    // console.log(gears);
    const splitArray = elem.split("");
    const gearsIndex = [];
    splitArray.map((gear, i) => {
      gear === "*" && gearsIndex.push(i);
    });
    // console.log(gearsIndex);
    gearsIndex.map((gearIndex) => {
      const fullNumbersArray = [];
      const prevCharacter =
        elem[gearIndex - 1].match(/[0-9]/) && elem[gearIndex - 1];
      // prevCharacter !== null && fullNumbersArray.push(prevCharacter);
      // prevCharacter !== null && console.log("prev character", prevCharacter, "prior characters", dataSet[index][gearIndex - 1])
      prevCharacter !== null &&
        dataSet[index][gearIndex - 3].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex - 3, gearIndex))
        );
      prevCharacter !== null &&
        dataSet[index][gearIndex - 3].match(/[0-9]/) === null &&
        dataSet[index][gearIndex - 2].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex - 2, gearIndex))
        );
      prevCharacter !== null &&
        dataSet[index][gearIndex - 3].match(/[0-9]/) === null &&
        dataSet[index][gearIndex - 2].match(/[0-9]/) === null &&
        dataSet[index][gearIndex - 1].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex - 1, gearIndex))
        );

      const nextCharacter =
        elem[gearIndex + 1].match(/[0-9]/) && elem[gearIndex - 1];
      // nextCharacter !== null && fullNumbersArray.push(nextCharacter);
      nextCharacter !== null &&
        dataSet[index][gearIndex + 3].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex + 1, gearIndex + 4))
        );
      nextCharacter !== null &&
        dataSet[index][gearIndex + 3].match(/[0-9]/) === null &&
        dataSet[index][gearIndex + 2].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex + 1, gearIndex + 3))
        );
      nextCharacter !== null &&
        dataSet[index][gearIndex + 3].match(/[0-9]/) === null &&
        dataSet[index][gearIndex + 2].match(/[0-9]/) === null &&
        dataSet[index][gearIndex + 1].match(/[0-9]/) !== null &&
        fullNumbersArray.push(
          Number(dataSet[index].slice(gearIndex + 1, gearIndex + 2))
        );

      const aboveCharacters =
        dataSet[index - 1] &&
        dataSet[index - 1].slice(gearIndex - 1, gearIndex + 2);
      // aboveCharacters && console.log(gearIndex, "above characters: ", aboveCharacters)
      // console.log(dataSet[index - 1] && dataSet[index - 1][gearIndex].match(/[0-9]/))
      // aboveCharacters !== undefined && console.log(aboveCharacters)
      const aboveNumberArray =
        aboveCharacters !== undefined && aboveCharacters.match(/[0-9]+/g);
      // aboveNumberArray && console.log(gearIndex, "above number array: ", aboveNumberArray)

      aboveNumberArray &&
        aboveNumberArray.map((e, i) => {
          let aboveNumberStartIndex;
          if (aboveNumberArray.length === 2) {
            i === 0 ? (aboveNumberStartIndex = i) : (aboveNumberStartIndex = 2);
          } else {
            aboveNumberStartIndex = aboveCharacters.match(/[0-9]+/).index;
          }

          e.length === 3 && fullNumbersArray.push(Number(e));
          e.length === 2 &&
            aboveNumberStartIndex === 0 &&
            dataSet[index - 1][gearIndex - 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex - 2, gearIndex + 1))
            );
          e.length === 2 &&
            aboveNumberStartIndex === 0 &&
            dataSet[index - 1][gearIndex - 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex - 1, gearIndex + 1))
            );
          e.length === 2 &&
            aboveNumberStartIndex === 1 &&
            dataSet[index - 1][gearIndex + 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex, gearIndex + 3))
            );
          e.length === 2 &&
            aboveNumberStartIndex === 1 &&
            dataSet[index - 1][gearIndex + 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex, gearIndex + 2))
            );
          e.length === 1 &&
            aboveNumberStartIndex === 0 &&
            dataSet[index - 1][gearIndex - 3].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex - 3, gearIndex))
            );
          e.length === 1 &&
            aboveNumberStartIndex === 0 &&
            dataSet[index - 1][gearIndex - 3].match(/[0-9]/) === null &&
            dataSet[index - 1][gearIndex - 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex - 2, gearIndex))
            );
            e.length === 1 &&
            aboveNumberStartIndex === 0 &&
            dataSet[index - 1][gearIndex - 3].match(/[0-9]/) === null &&
            dataSet[index - 1][gearIndex - 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex - 1, gearIndex))
            );
          e.length === 1 &&
            aboveNumberStartIndex === 2 &&
            dataSet[index - 1][gearIndex + 3].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex + 1, gearIndex + 4))
            );
          e.length === 1 &&
            aboveNumberStartIndex === 2 &&
            dataSet[index - 1][gearIndex + 3].match(/[0-9]/) === null &&
            dataSet[index - 1][gearIndex + 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex + 1, gearIndex + 3))
            );
            e.length === 1 &&
            aboveNumberStartIndex === 2 &&
            dataSet[index - 1][gearIndex + 3].match(/[0-9]/) === null &&
            dataSet[index - 1][gearIndex + 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex + 1, gearIndex + 2))
            );
          e.length === 1 &&
            aboveNumberStartIndex === 1 &&
            fullNumbersArray.push(
              Number(dataSet[index - 1].slice(gearIndex, gearIndex + 1))
            );
        });

      const belowCharacters =
        dataSet[index + 1] &&
        dataSet[index + 1].slice(gearIndex - 1, gearIndex + 2);
      // console.log("below characters", belowCharacters)
      // console.log("below", belowCharacters, index)
      const belowNumberArray =
        belowCharacters && belowCharacters.match(/[0-9]+/g);
      // console.log("below number array",belowNumberArray)
      belowNumberArray &&
        belowNumberArray.map((e, i) => {
          let belowNumberStartIndex;
          if (belowNumberArray.length === 2) {
            i === 0 ? (belowNumberStartIndex = i) : (belowNumberStartIndex = 2);
          } else {
            belowNumberStartIndex = belowCharacters.match(/[0-9]+/).index;
          }
          // console.log("below number index", belowNumberStartIndex)
          // console.log("e", e)
          // console.log(e.length, e)
          e.length === 3 && fullNumbersArray.push(Number(e));
          e.length === 2 &&
            belowNumberStartIndex === 0 &&
            dataSet[index + 1][gearIndex - 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex - 2, gearIndex + 1))
            );
          e.length === 2 &&
            belowNumberStartIndex === 0 &&
            dataSet[index + 1][gearIndex - 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex - 1, gearIndex + 1))
            );
          e.length === 2 &&
            belowNumberStartIndex === 1 &&
            dataSet[index + 1][gearIndex + 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex, gearIndex + 3))
            );
          e.length === 2 &&
            belowNumberStartIndex === 1 &&
            dataSet[index + 1][gearIndex + 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex, gearIndex + 2))
            );
          e.length === 1 &&
            belowNumberStartIndex === 0 &&
            dataSet[index + 1][gearIndex - 3].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex - 3, gearIndex))
            );
          e.length === 1 &&
            belowNumberStartIndex === 0 &&
            dataSet[index + 1][gearIndex - 3].match(/[0-9]/) === null &&
            dataSet[index + 1][gearIndex - 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex - 2, gearIndex))
            );
            e.length === 1 &&
            belowNumberStartIndex === 0 &&
            dataSet[index + 1][gearIndex - 3].match(/[0-9]/) === null &&
            dataSet[index + 1][gearIndex - 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex - 1, gearIndex))
            );
          e.length === 1 &&
            belowNumberStartIndex === 2 &&
            dataSet[index + 1][gearIndex + 3].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex + 1, gearIndex + 4))
            );
            e.length === 1 &&
            belowNumberStartIndex === 2 &&
            dataSet[index + 1][gearIndex + 3].match(/[0-9]/) === null &&
            dataSet[index + 1][gearIndex + 2].match(/[0-9]/) !== null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex + 1, gearIndex + 3))
            );
            e.length === 1 &&
            belowNumberStartIndex === 2 &&
            dataSet[index + 1][gearIndex + 3].match(/[0-9]/) === null &&
            dataSet[index + 1][gearIndex + 2].match(/[0-9]/) === null &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex + 1, gearIndex + 2))
            );
          e.length === 1 &&
            belowNumberStartIndex === 1 &&
            fullNumbersArray.push(
              Number(dataSet[index + 1].slice(gearIndex, gearIndex + 1))
            );
        });

      // console.log(gearIndex, index, "full number array: ", fullNumbersArray);
      fullNumbersArray.length === 2 && numberArray.push(fullNumbersArray.reduce((a, b) => a * b))
      // fullNumbersArray.length === 2 && console.log("pairs", fullNumbersArray)
    });
  });
  // console.log(numberArray)
  console.log(numberArray.reduce((a, b) => a + b));
  // console.log("Big int test", numberArray.reduce((a, b) => a + b));
  // console.log(Math.floor(numberArray.length / 2), Math.ceil(numberArray.length / 2))
  // const half = Math.floor(numberArray.length / 2)
  // const left = numberArray.slice(0, half);
  // const leftSum = left.reduce((a, b) => a + b)
  // const right = numberArray.slice(half);
  // const rightHalf = Math.floor(right.length / 2)
  // const rightLeft = right.slice(0, rightHalf);
  // const rightRight = right.slice(rightHalf)
  // console.log("half:", half)
  // console.log("left:", left.length, "left sum:", leftSum)
  // console.log("right:", right.length, "right half length", rightHalf)
  // console.log("Right left side: ", rightLeft, "Right right side: ", rightRight)
  // console.log("Split sum:", )
}

// gearFinder(smallData);
gearFinder(data)

function numberFinder(dataSet) {
  // Empty object to store numbers and their indexes
  const numberArray = [];

  // Map through the data set and push numbers to numberArray
  dataSet.map((elem, index) => {
    // Find the numbers in the string
    const numbers = elem.match(/\d+/g);

    numbers.map((number) => {
      let passed = false;

      const numReg = new RegExp(`(?<!\\d)${number}(?!\\d)`);
      const numberIndex = elem.match(numReg).index;

      const prevCharacter = elem[numberIndex - 1];
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
}

// numberFinder(smallData);
// numberFinder(data);

// const aboveCharacters =
//         dataSet[index - 1] &&
//         dataSet[index - 1].slice(gearIndex - 1, gearIndex + 2);
//       // aboveCharacters && console.log(gearIndex, "above characters: ", aboveCharacters)
//       // console.log(dataSet[index - 1] && dataSet[index - 1][gearIndex].match(/[0-9]/))
//       // aboveCharacters !== undefined && console.log(aboveCharacters)
//       const aboveNumberArray =
//         aboveCharacters !== undefined && aboveCharacters.match(/[0-9]+/);
//       // aboveNumberArray && console.log(gearIndex, "above number array: ", aboveNumberArray)

//       const aboveNumbers = aboveNumberArray !== null && aboveNumberArray[0];
//       // aboveNumbers && console.log(gearIndex, "above numbers: ", aboveNumbers)
//       const aboveNumberStartIndex =
//         aboveNumberArray !== null && aboveNumberArray.index;
//       // console.log(gearIndex, "number start index", aboveNumberStartIndex)
//       // console.log(aboveNumbers, aboveNumberStartIndex, gearIndex, index)
//       // console.log(aboveNumberStartIndex, aboveNumbers)

//       if (aboveNumbers) {
//         aboveNumbers.length === 3 &&
//           fullNumbersArray.push(Number(aboveNumbers));
//         aboveNumbers.length === 2 &&
//           aboveNumberStartIndex === 0 &&
//           dataSet[index - 1][gearIndex - 2].match(/[0-9]/) !== null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex - 2, gearIndex + 1))
//           );
//         aboveNumbers.length === 2 &&
//           aboveNumberStartIndex === 0 &&
//           dataSet[index - 1][gearIndex - 2].match(/[0-9]/) === null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex - 1, gearIndex + 1))
//           );
//         aboveNumbers.length === 2 &&
//           aboveNumberStartIndex === 1 &&
//           dataSet[index - 1][gearIndex + 2].match(/[0-9]/) !== null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex, gearIndex + 3))
//           );
//         aboveNumbers.length === 2 &&
//           aboveNumberStartIndex === 1 &&
//           dataSet[index - 1][gearIndex + 2].match(/[0-9]/) === null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex, gearIndex + 2))
//           );
//         aboveNumbers.length === 1 &&
//           aboveNumberStartIndex === 0 &&
//           dataSet[index - 1][gearIndex - 3].match(/[0-9]/) !== null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex - 3, gearIndex))
//           );
//         aboveNumbers.length === 1 &&
//           aboveNumberStartIndex === 0 &&
//           dataSet[index - 1][gearIndex - 3].match(/[0-9]/) === null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex - 2, gearIndex))
//           );
//         aboveNumbers.length === 1 &&
//           aboveNumberStartIndex === 2 &&
//           dataSet[index - 1][gearIndex + 3].match(/[0-9]/) !== null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex + 1, gearIndex + 4))
//           );
//         aboveNumbers.length === 1 &&
//           aboveNumberStartIndex === 2 &&
//           dataSet[index - 1][gearIndex + 3].match(/[0-9]/) === null &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex + 1, gearIndex + 3))
//           );
//         aboveNumbers.length === 1 &&
//           aboveNumberStartIndex === 1 &&
//           fullNumbersArray.push(
//             Number(dataSet[index - 1].slice(gearIndex, gearIndex + 1))
//           );
//       }
