import data from "./data.js";

const smallData = [
  "Card   1:  9 39 27 89 87 29 54 19 43 45 |  9 80 29 20 54 58 78 77 39 35 76 79 19 87 45 89 23 31 94 34 67 43 56 50 27",
  "Card   2: 89 59 76  2 60 83 21 37 92 45 | 79  5 41 92 45 59 72 50 89 37 64 65 60 54 57 22 66 21 25 76  1 39 83  2 33",
  "Card   3: 40 25 13 65 86  5 35 87  9 30 | 87 76 30 93  5 45 16 40 48 89 78 59 18 12 71 85 66 21 80 28 50 60 49 72 27",
  "Card   4: 21 34 70 83 66 44 90 68 76 12 | 46 80 70 73 44 99 32 98 66 68 76 28 85 74 17 38 27 22 83 16 12 90 33 34 21",
  "Card   5:  5 67 90 43 26 31 17 47 14  1 | 83 64 47 24 33  5 90 20 19 61 14 56 67 26  1 70 31  9 17 57 43 95 82 91 49",
];

// 9, 39, 27, 89, 87, 29, 54, 19, 43, 45 = 9 = 512
// 89, 59, 76, 2, 60, 83, 21, 37, 92, 45 = 10 = 512
// 40, 5, 87, 30 = 4 = 8
// 21, 34, 70, 83, 66, 44, 90, 68, 76, 12 = 10 = 512
// 5, 67, 90, 43, 26, 31, 17, 47, 14, 1 = 10 = 512
// 2056

// 1, 2, 4, 8, 16, 32, 64, 128, 256, 514

const secondData = [
  "Card 199: 30 15 96  2 41 56 50 81 29 60 | 42 56  5 50 40  1  6 77 61 73 60 74 79  8 53  3 75 80 36 64 89 43 81 70 90",
  "Card 200: 86 29 15 97 91 10 62 68 19 75 |  8 12 68 18 36 62 37 16 41 97  5 64 81 80 75  6 24 59 23 33 79  1 22 63 89",
  "Card 201: 16 72 24 22 23 44 67  3 27 85 | 54 78 25 59 87  6 98 81 49 77 83 33 82 99 90 32 65 57 30 36 28 95 92 17 71",
  "Card 202: 69 11 38 33 26 39 84 57 98 36 | 46 35 45 80 94 26 52 92 76 90 55 31 18 73 30 15  7 39  4 34 19 47 21 29 54",
  "Card 203: 62 87 19 82  3 28 64  9 93 80 | 50 11 71 78 36 25 66 40 43 51 81 48 44 27 75 73 14 26 99 49 69  6 55 33 67",
  "Card 204: 82 64 58 18 73 13  2 71 24 49 |  9 61 47 31  5 89 78 99 40 54 23 68 38 95 69 84 53 27 45 33 87 90 93 44 60",
];

// // Part 2
function winningFinder(card, index, dataSet) {
    const winningNumbersArray = [];

    const allNumbers = card.split(":")[1];
    // console.log(index, "card numbers:", allNumbers)

    const winNumbers = allNumbers
      .split("|")[0]
      .trim()
      .split(" ")
      .filter((e) => -e);
    // console.log("Win numbers", winNumbers)

    const ourNumbers = allNumbers
      .split("|")[1]
      .trim()
      .split(" ")
      .filter((e) => -e);
    // console.log("Our numbers", ourNumbers)

    winNumbers.map((win, i) => {
      ourNumbers.map((our) => {
        !winningNumbersArray.includes(i) && win === our && winningNumbersArray.push(i)
      });
    });
    // console.log("Winning numbers", winningNumbersArray)
    // console.log("number of wins length", winningNumbersArray.length)

    const cardsWonIndexArray = [];

    for(let i = 1; i <= winningNumbersArray.length; i++) {
        index + i < dataSet.length && cardsWonIndexArray.push(index + i);
    };
    // console.log("Current card: ", index, "Cards won: ", cardsWonIndexArray, "Number of cards", dataSet.length - 1)
    // console.log("Number of cards won", cardsWonIndexArray.length)

    let cascadeCardsWon = 0;
    // winningFinder(dataSet[e], e, dataSet)
    cardsWonIndexArray.length >= 1 && cardsWonIndexArray.map((e) => {
        const eachCardCascadeWins = winningFinder(dataSet[e], e, dataSet);
        cascadeCardsWon += eachCardCascadeWins;
    })

    return (cascadeCardsWon + cardsWonIndexArray.length);

}



function cardFinder(dataSet) {
  const totalCardsArray = [];

//   console.log("dataSet:",dataSet)

  dataSet.map((card, index) => {
    const numberOfCardsWon = winningFinder(card, index, dataSet);

    totalCardsArray.push(numberOfCardsWon + 1)

  });
  console.log(totalCardsArray.reduce((a, b) => a + b));
  console.log(totalCardsArray)
}

// cardFinder(smallData);
// cardFinder(secondData);

// !!!!! Don't run below randomly!!!!!
// !!!! It requires a lot of CPU XP !!!!
// cardFinder(data);
// !!!! Careful of above!!!!!




// // Part 1
function winFinder(dataSet) {
    const pointsArray = [];
  
  //   console.log("dataSet:",dataSet)
  
    dataSet.map((card, index) => {
      const numberOfWins = [];
  
      const allNumbers = card.split(":")[1];
      // console.log(index, "card numbers:", allNumbers)
  
      const winNumbers = allNumbers
        .split("|")[0]
        .trim()
        .split(" ")
        .filter((e) => -e);
      // console.log("Win numbers", winNumbers)
  
      const ourNumbers = allNumbers
        .split("|")[1]
        .trim()
        .split(" ")
        .filter((e) => -e);
      // console.log("Our numbers", ourNumbers)
  
      winNumbers.map((win, i) => {
        ourNumbers.map((our) => {
          !numberOfWins.includes(i) && win === our && numberOfWins.push(i)
        });
      });
      // console.log("Number of wins", numberOfWins)
      // console.log("number of wins length", numberOfWins.length)
  
      let points = 0;
  
      if (numberOfWins.length >= 1) {
          points++
        for (let i = 1; i < numberOfWins.length; i++) {
          points *= 2;
        }
      } else if (numberOfWins === 1) {
          points++
      }
      // console.log("points", points)
      pointsArray.push(points);
    });
    console.log(pointsArray.reduce((a, b) => a + b));
  //   console.log(pointsArray)
  }