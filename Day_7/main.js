import data from "./data.js";

const log = console.log.bind(console);

const testData = [
  "32T3K 765",
  "T55J5 684",
  // "KK677 28",
  // "KTJJT 220",
  // "QQQJA 483"
  "AAAAA 673"
];

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
  const cardPoints = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  handBetArray.map((elemArray) => {
    // log("Each hand and bet", elemArray)

    const mixedArray = [];

    cards.map((card, i) => {
      const regExp = `${card}`;

      // log(elemArray[0])
      const cardsWithin = [...elemArray[0].matchAll(regExp, "g")];
      // log("Number of matches", cardsWithin.length)

      // pushes a five of a kind to the array
      cardsWithin.length === 5 &&
        fiveKindArray.push([...elemArray, cardPoints[i]]);
      // pushed a four of a kind to the array
      cardsWithin.length === 4 &&
        fourKindArray.push([...elemArray, cardPoints[i]]);
      // pushes the length to the mixed array if it is 2 or 3
      cardsWithin.length === 3 && mixedArray.push(cardsWithin.length);
      cardsWithin.length === 2 && mixedArray.push(cardsWithin.length);

      // for (const matches of cardsWithin) {
      //     log("Match all results", matches)
      // }
    });
    mixedArray.length === 0 && highCard.push(elemArray);

    const threeOfAKind = mixedArray.includes(3);
    const twoOfAKind = mixedArray.includes(2);
    // log("Three of a kind?",threeOfAKind)
    // log("Two of a kind?", twoOfAKind)

    if (threeOfAKind && twoOfAKind) {
      fullHouse.push(elemArray);
      // log("Full house")
    } else if (threeOfAKind) {
      threeKind.push(elemArray);
    //   log("Three of a kind");
    } else if (twoOfAKind && mixedArray.length === 2) {
      twoPair.push(elemArray);
      // log("Two pair")
    } else {
      onePair.push(elemArray);
      // log("Pair")
    }
  });

  log("Five of a kind", fiveKindArray);
  log("Four of a kind", fourKindArray);
  log("Full house", fullHouse);
  log("Three of a kind", threeKind);
  log("Two pair", twoPair);
  log("Pair", onePair);
  log("High card", highCard);
}

// betCalculator(testData);
betCalculator(data)
