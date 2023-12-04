// Imports
import data from "./data.js";

// Small daat set
const smallData = [
  "..........$.............52............602......%........*...105..$.................938...431.............................157......#...310...",
  "...581../...............$.........309.......*...........846.../..718..........568@..*.......*...261...............22.........-852......*....",
  "......*.969.349..354.....................156.666....@................-378..-................632....*..........363*........./......976.871...",
  ".....60.....*.......*....10...@..684#..............225....248.............904..........638$......896....%.................906.926...*.......",
  ".............602.....958.....103..........703..........................$.........456.........704.........149...785.2=...........*.87...95...",
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
// 349 * 602(201098), 354 * 956(338424), 976 * 87(84912) = 624434
// n/a
// 1,547,434

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
    gearsIndex.map(gearIndex => {
      const prevCharacter = elem[gearIndex - 1].match(/[0-9]/) && elem[gearIndex - 1];
      // prevCharacter !== null && console.log(prevCharacter);

      const nextCharacter = elem[gearIndex + 1].match(/[0-9]/) && elem[gearIndex - 1];
      // nextCharacter !== null && console.log(nextCharacter);

      const aboveCharacters = dataSet[index - 1] && dataSet[index - 1].slice(gearIndex -1, gearIndex + 2)
      // console.log(dataSet[index - 1] && dataSet[index - 1][gearIndex].match(/[0-9]/))
      // aboveCharacters !== undefined && console.log(aboveCharacters)
      const aboveNumberArray = aboveCharacters !== undefined && aboveCharacters.match(/[0-9]+/);
      const aboveNumbers = aboveNumberArray !== null && aboveNumberArray[0];
      const aboveNumberStartIndex = aboveNumberArray !== null && aboveNumberArray.index;
      // console.log(aboveNumbers, aboveNumberStartIndex, gearIndex, index)
      let aboveFullNumber;
      
      //  if(aboveNumbers) {
      //   if(aboveNumbers.length === 1) {
      //     if(aboveNumberStartIndex === 0) {
      //       // console.log(aboveNumbers, aboveNumberStartIndex);
      //       for(let i = gearIndex - 1; i >= gearIndex - 3; i--) {
      //         console.log(dataSet[index -1][i], gearIndex)
      //       }
      //     }

      //   }
      //  }
    })
    // loop forward and back from the index and find any values that regex 0-9 and add together to make the number
    // Again, above and below, find if a number is present and then loop again
  });
  // console.log(numberArray.reduce((a, b) => a + b));
}

gearFinder(smallData);







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
