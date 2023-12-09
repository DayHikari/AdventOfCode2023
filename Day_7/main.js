import data from "./data.js";

const log = console.log.bind(console);

const testData = [
  "32T3K 765",
  "T55J5 684",
  "KK677 28",
  "KTJJT 220",
  "QQQJA 483",

];

const allTypeTest = [
  "AAAAA 100",
  "AJAJA 100",
  "AJAAA 100",
  "AJJJJ 100",
  "AJJJA 100",
  "AAAAT 100",
  "AAAJT 100",
  "AAJJT 100",
  "JAJJT 100",
  "AATTT 100",
  "AATJT 100",
  "AAATQ 100",
  "AAJTQ 100",
  "AJJTQ 100",
  "AKJTQ 100",
]

function sorter(array) {
  const sortedArray = array.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[3] === b[3]) {
        if (a[4] === b[4]) {
          if (a[5] === b[5]) {
            return b[6] - a[6];
          }
          return b[5] - a[5];
        }
        return b[4] - a[4];
      }
      return b[3] - a[3];
    }
    return b[2] - a[2];
  });
  return sortedArray;
}

function betCalculator(dataArray) {
  // log("Starting data", dataArray)
  const handBetArray = dataArray.map((elem) => [
    elem.split(" ")[0],
    Number(elem.split(" ")[1]),
  ]);
  // log("Seperated hand and bet array", handBetArray)

  const fiveKindArray = [];
  const fourKindArray = [];
  const fullHouse = [];
  const threeKind = [];
  const twoPair = [];
  const onePair = [];
  const highCard = [];
  const cards = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const cardPoints = [14, 13, 12, 1, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  handBetArray.map((elemArray) => {
    // log("Each hand and bet", elemArray)

    const mixedArray = [];
    let moreThanHigh = false;
    const cardValueArray = [];
    elemArray[0].split("").map((singleCard) => {
      cards.map((card, cardIndex) => {
        singleCard === card && cardValueArray.push(cardPoints[cardIndex]);
      });
    });

    cards.map((card) => {
      const regExp = `${card}`;

      // log(elemArray[0])
      const cardsWithin = [...elemArray[0].matchAll(regExp, "g")];
      // log("Number of matches", cardsWithin.length)

      // pushes a five of a kind to the array
      if (cardsWithin.length === 5) {
        moreThanHigh = true;
        fiveKindArray.push([...elemArray, ...cardValueArray]);
      }

      // pushed a four of a kind to the array
      if (cardsWithin.length === 4) {
        moreThanHigh = true;
        const jWithin = [...elemArray[0].matchAll("J", "g")];
        jWithin.length === 1 || jWithin.length === 4
          ? fiveKindArray.push([...elemArray, ...cardValueArray])
          : fourKindArray.push([...elemArray, ...cardValueArray]);
      }

      // pushes the length to the mixed array if it is 2 or 3
      cardsWithin.length === 3 && mixedArray.push([cardsWithin.length]);
      cardsWithin.length === 2 && mixedArray.push([cardsWithin.length]);
    });
    const jWithin = [...elemArray[0].matchAll("J", "g")];

    mixedArray.length === 0 && !moreThanHigh && (jWithin.length === 1
      ? onePair.push([...elemArray, ...cardValueArray])
      : highCard.push([...elemArray, ...cardValueArray]))

    let threeOfAKind;
    // let threeOfAKindValue;
    let twoOfAKind;
    // let twoOfAKindValues = [];

    mixedArray.map((cardScores) => {
      cardScores[0] === 3 && (threeOfAKind = true);
      cardScores[0] === 2 && (twoOfAKind = true);
    });

    if (threeOfAKind && twoOfAKind) {
      jWithin.length === 3 || jWithin.length === 2
        ? fiveKindArray.push([...elemArray, ...cardValueArray])
        : fullHouse.push([...elemArray, ...cardValueArray]);
      // log("Full house")
      // string, bet, three of a kind points, pair points, order points
    } else if (threeOfAKind) {
      jWithin.length === 3 || jWithin.length === 1
        ? fourKindArray.push([...elemArray, ...cardValueArray])
        : threeKind.push([...elemArray, ...cardValueArray]);
      //   log("Three of a kind");
      // string, bet, three of a kind points
    } else if (twoOfAKind && mixedArray.length === 2) {
      jWithin.length === 2
        ? fourKindArray.push([...elemArray, ...cardValueArray])
        : jWithin.length === 1
        ? fullHouse.push([...elemArray, ...cardValueArray])
        : twoPair.push([...elemArray, ...cardValueArray]);
      // log("Two pair")
    } else if (mixedArray.length === 1) {
      jWithin.length === 2 || jWithin.length === 1 ? threeKind.push([...elemArray, ...cardValueArray]) : onePair.push([...elemArray, ...cardValueArray]);
      // log("Pair")
    }
  });



  const fiveKindArraySorted = sorter(fiveKindArray);
  const fourKindArraySorted = sorter(fourKindArray);
  const fullHouseSorted = sorter(fullHouse);
  const threeKindSorted = sorter(threeKind);
  const twoPairSorted = sorter(twoPair);
  const onePairSorted = sorter(onePair);
  const highCardSorted = sorter(highCard);

  log("Five of a kind", fiveKindArraySorted);
  log("Four of a kind sorted", fourKindArraySorted);
  log("Full house", fullHouseSorted);
  log("Three of a kind", threeKindSorted);
  log("Two pair", twoPairSorted);
  log("Pair", onePairSorted);
  log("High card", highCardSorted);

  let total = 0;
  let rank = 0;

  for (let i = highCardSorted.length - 1; i >= 0; i--) {
    rank++;
    total += highCardSorted[i][1] * rank;
  }
  for (let i = onePairSorted.length - 1; i >= 0; i--) {
    rank++;
    total += onePairSorted[i][1] * rank;
  }
  for (let i = twoPairSorted.length - 1; i >= 0; i--) {
    rank++;
    total += twoPairSorted[i][1] * rank;
  }
  for (let i = threeKindSorted.length - 1; i >= 0; i--) {
    rank++;
    total += threeKindSorted[i][1] * rank;
  }
  for (let i = fullHouseSorted.length - 1; i >= 0; i--) {
    rank++;
    total += fullHouseSorted[i][1] * rank;
  }
  for (let i = fourKindArraySorted.length - 1; i >= 0; i--) {
    rank++;
    total += fourKindArraySorted[i][1] * rank;
  }
  for (let i = fiveKindArraySorted.length - 1; i >= 0; i--) {
    rank++;
    total += fiveKindArraySorted[i][1] * rank;
  }

  // log("data length: ", data.length)
  log("Total bets: ", total);
}

// betCalculator(testData);
betCalculator(allTypeTest);
betCalculator(data);

// // // Part 1
// function sorter(array) {
//   const sortedArray = array.sort((a, b) => {
//     if (a[2] === b[2]) {
//       if (a[3] === b[3]) {
//         if (a[4] === b[4]) {
//           if (a[5] === b[5]) {
//             return b[6] - a[6];
//           }
//           return b[5] - a[5];
//         }
//         return b[4] - a[4];
//       }
//       return b[3] - a[3];
//     }
//     return b[2] - a[2];
//   });
//   return sortedArray;
// }

// function betCalculator(dataArray) {
//   // log("Starting data", dataArray)
//   const handBetArray = dataArray.map((elem) => [
//     elem.split(" ")[0],
//     Number(elem.split(" ")[1]),
//   ]);
//   // log("Seperated hand and bet array", handBetArray)

//   const fiveKindArray = [];
//   const fourKindArray = [];
//   const fullHouse = [];
//   const threeKind = [];
//   const twoPair = [];
//   const onePair = [];
//   const highCard = [];
//   const cards = [
//     "A",
//     "K",
//     "Q",
//     "J",
//     "T",
//     "9",
//     "8",
//     "7",
//     "6",
//     "5",
//     "4",
//     "3",
//     "2",
//   ];
//   const cardPoints = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

//   handBetArray.map((elemArray) => {
//     // log("Each hand and bet", elemArray)

//     const mixedArray = [];
//     let moreThanHigh = false;
//     const cardValueArray = [];
//     elemArray[0].split("").map((singleCard) => {
//       cards.map((card, cardIndex) => {
//         singleCard === card && cardValueArray.push(cardPoints[cardIndex]);
//       });
//     });

//     cards.map((card, i) => {
//       const regExp = `${card}`;

//       // log(elemArray[0])
//       const cardsWithin = [...elemArray[0].matchAll(regExp, "g")];
//       // log("Number of matches", cardsWithin.length)

//       // pushes a five of a kind to the array
//       if (cardsWithin.length === 5) {
//         moreThanHigh = true;
//         fiveKindArray.push([...elemArray, cardPoints[i]]);
//       }

//       // pushed a four of a kind to the array
//       if (cardsWithin.length === 4) {
//         moreThanHigh = true;
//             fourKindArray.push([...elemArray, ...cardValueArray]);
//       }

//       // pushes the length to the mixed array if it is 2 or 3
//       cardsWithin.length === 3 &&
//         mixedArray.push([cardsWithin.length]);
//       cardsWithin.length === 2 &&
//         mixedArray.push([cardsWithin.length]);
//     });
//     mixedArray.length === 0 && !moreThanHigh && highCard.push([...elemArray, ...cardValueArray]);

//     let threeOfAKind;
//     let threeOfAKindValue;
//     let twoOfAKind;
//     let twoOfAKindValues = [];

//     mixedArray.map((cardScores) => {
//       cardScores[0] === 3 &&
//         (threeOfAKind = true)
//       cardScores[0] === 2 &&
//         (twoOfAKind = true)
//     });

//     if (threeOfAKind && twoOfAKind) {
//       fullHouse.push([...elemArray, ...cardValueArray]);
//       // log("Full house")
//       // string, bet, three of a kind points, pair points, order points
//     } else if (threeOfAKind) {
//       threeKind.push([...elemArray, ...cardValueArray]);
//       //   log("Three of a kind");
//       // string, bet, three of a kind points
//     } else if (twoOfAKind && mixedArray.length === 2) {
//       twoPair.push([...elemArray, ...cardValueArray]);
//       // log("Two pair")
//     } else if (mixedArray.length === 1) {
//       onePair.push([...elemArray, ...cardValueArray]);
//       // log("Pair")
//     }
//   });

//   const fiveKindArraySorted = fiveKindArray.sort((a, b) => {
//     b[2] - a[2];
//   });

//   const fourKindArraySorted = sorter(fourKindArray);
//   const fullHouseSorted = sorter(fullHouse);
//   const threeKindSorted = sorter(threeKind);
//   const twoPairSorted = sorter(twoPair);
//   const onePairSorted = sorter(onePair);
//   const highCardSorted = sorter(highCard);

//   // log("Five of a kind", fiveKindArraySorted);
//   // log("Four of a kind sorted", fourKindArraySorted);
//   // log("Full house", fullHouseSorted);
//   // log("Three of a kind", threeKindSorted);
//   // log("Two pair", twoPairSorted);
//   // log("Pair", onePairSorted);
//   // log("High card", highCardSorted);

//   let total = 0;
//   let rank = 0;

//   for (let i = highCardSorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (highCardSorted[i][1] * rank);
//   };
//   for (let i = onePairSorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (onePairSorted[i][1] * rank);
//   };
//   for (let i = twoPairSorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (twoPairSorted[i][1] * rank);
//   };
//   for (let i = threeKindSorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (threeKindSorted[i][1] * rank);
//   };
//   for (let i = fullHouseSorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (fullHouseSorted[i][1] * rank);
//   };
//   for (let i = fourKindArraySorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (fourKindArraySorted[i][1] * rank);
//   };
//   for (let i = fiveKindArraySorted.length -1; i >= 0; i--) {
//     rank++;
//     total += (fiveKindArraySorted[i][1] * rank);
//   };

//   // log("data length: ", data.length)
//   log("Total bets: ", total)
// };
