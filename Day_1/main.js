import data from "./data.js";

console.log(data.length);

// Function to determine code value
function codeBreaker(dataArray) {
  // An array to store each number found
  const totalArray = [];

  // Map through the array
  dataArray.map((elem) => {
    // An array for the first and last number to be added too
    const numberArray = [];

    // Split the elem into individual characters
    const characters = elem.split("");

    // For loop to interate through each character from the beginning
    for (let i = 0; i < characters.length; i++) {
      // If statement to prevent further pushes if numberArray contains a value
      if (numberArray.length !== 1) {
        // Switch statement to check if the character is a number
        switch (characters[i]) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            // Push the value to numberArray
            numberArray.push(characters[i]);
            break;
        }
      }
    }

    // For loop to interate through the characters from the end
    for (let i = characters.length - 1; i >= 0; i--) {
      // If statement to prevent pushing is numberArray contains 2 values
      if (numberArray.length !== 2) {
        // Switch statement to check each character
        switch (characters[i]) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            // Push to numberArray
            numberArray.push(characters[i]);
            break;
        }
      }
    }

    // Push the found number strings as a number to totalArray
    totalArray.push(Number(numberArray.join("")));
  });
  // Variable for the total value of totalArray
  const total = totalArray.reduce((acc, cur) => acc + cur);

  //   console.log(total);
}
// codeBreaker([
//   "pbkprbzvs819threeonekjpk7brkmbqbkgroneightb",
//   "sevensevenkpbggfhrhk121",
// ]);
// codeBreaker(data);

// Second function to crack the code
function secondCodeBreaker(dataArray) {
    // Declare the array for all numbers found
    const totalArray = [];
  // Map through the data array
  dataArray.map((elem) => {
    // Declare an array for all numbers present
    const presentArray = [];

    // Use matchAll method on the elem to find each potential number in the string
    // Then push the name, value and index to the array for each match
    const oneString = elem.matchAll(/one/g);
    for (const matches of oneString) {
        presentArray.push(["oneString", 1, matches.index])
    }
    const twoString = elem.matchAll(/two/g);
    for (const matches of twoString) {
        presentArray.push(["twoString", 2, matches.index])
    }
    const threeString = elem.matchAll(/three/g);
    for (const matches of threeString) {
        presentArray.push(["threeString", 3, matches.index])
    }
    const fourString = elem.matchAll(/four/g);
    for (const matches of fourString) {
        presentArray.push(["fourString", 4, matches.index])
    }
    const fiveString = elem.matchAll(/five/g);
    for (const matches of fiveString) {
        presentArray.push(["fiveString", 5, matches.index])
    }
    const sixString = elem.matchAll(/six/g);
    for (const matches of sixString) {
        presentArray.push(["sixString", 6, matches.index])
    }
    const sevenString = elem.matchAll(/seven/g);
    for (const matches of sevenString) {
        presentArray.push(["sevenString", 7, matches.index])
    }
    const eightString = elem.matchAll(/eight/g);
    for (const matches of eightString) {
        presentArray.push(["eightString", 8, matches.index])
    }
    const nineString = elem.matchAll(/nine/g);
    for (const matches of nineString) {
        presentArray.push(["nineString", 9, matches.index])
    }
    const oneNumber = elem.matchAll(/1/g);
    for (const matches of oneNumber) {
        presentArray.push(["oneNumber", 1, matches.index])
    }
    const twoNumber = elem.matchAll(/2/g);
    for (const matches of twoNumber) {
        presentArray.push(["twoNumber", 2, matches.index])
    }
    const threeNumber = elem.matchAll(/3/g);
    for (const matches of threeNumber) {
        presentArray.push(["threeNumber", 3, matches.index])
    }
    const fourNumber = elem.matchAll(/4/g);
    for (const matches of fourNumber) {
        presentArray.push(["fourNumber", 4, matches.index])
    }
    const fiveNumber = elem.matchAll(/5/g);
    for (const matches of fiveNumber) {
        presentArray.push(["fiveNumber", 5, matches.index])
    }
    const sixNumber = elem.matchAll(/6/g);
    for (const matches of sixNumber) {
        presentArray.push(["sixNumber", 6, matches.index])
    }
    const sevenNumber = elem.matchAll(/7/g);
    for (const matches of sevenNumber) {
        presentArray.push(["sevenNumber", 7, matches.index])
    }
    const eightNumber = elem.matchAll(/8/g);
    for (const matches of eightNumber) {
        presentArray.push(["eightNumber", 8, matches.index])
    }
    const nineNumber = elem.matchAll(/9/g);
    for (const matches of nineNumber) {
        presentArray.push(["nineNumber", 9, matches.index])
    }

    // Sort the present array 
    presentArray.sort((a, b) => a[2] -b[2]);

    // Create the number from the first and last item in the sorted array
    const number = Number(`${presentArray[0][1]}${presentArray[presentArray.length -1][1]}`);

    // Push the number into the total array
    totalArray.push(number);

  });

  // console.log the sum of total array
  console.log(totalArray.reduce((acc, cur) => acc + cur))
}

secondCodeBreaker([
  "pbkprbzvs819threeonekjpk7brkmbqbkgroneightb",
  "sevensevenkpbggfhrhk121",
]);
secondCodeBreaker(data);