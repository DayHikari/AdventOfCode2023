// Imports
import data from "./data.js";

// Small data set from the main data file
const smallData = [
  "Game 1: 4 green, 2 blue; 1 red, 1 blue, 4 green; 3 green, 4 blue, 1 red; 7 green, 2 blue, 4 red; 3 red, 7 green; 3 red, 3 green",
  "Game 2: 1 blue, 11 red, 1 green; 3 blue, 2 red, 4 green; 11 red, 2 green, 2 blue; 13 green, 5 red, 1 blue; 4 green, 8 red, 3 blue",
  "Game 3: 9 red, 2 blue; 4 blue, 2 green, 1 red; 7 red, 4 blue, 3 green; 3 blue, 6 red; 9 blue, 4 red; 3 red",
  "Game 4: 5 blue, 11 green, 3 red; 6 green, 3 blue, 7 red; 17 blue, 9 green; 1 red, 5 blue, 3 green; 6 red, 7 blue, 4 green",
  "Game 5: 3 green, 7 blue, 7 red; 6 green, 3 red, 4 blue; 7 blue, 4 red",
];

// 12 Red Cubes, 13 Green Cubes, 14 Blue Cubes
const cubeObject = {
    red: 12,
    green: 13,
    blue: 14
}


// Function to determine which games are possible
function possible(testData) {
    // Create an empty array to contain all passing numbers
    const passedGames = [];

    // Map through the data
    testData.map(elem => {
        // Variable set to true to determine if the game passes
        let pass = true;
        // Split the string and assign the game number to a variable
        const gameNumber = Number(elem.split(":")[0].substring(5));

        // Split the string into the individual pulls as an array 
        const pulledArray = elem.split(":")[1].split(";");

        // Split the strings into an array of the colour number pairs
        pulledArray.map(e => {
            // Split at the commas
            const commaSplit = e.split(",");

            // Split the pairs and trim whitespace
            commaSplit.map(cubes => {
                // Split and strim the strings
                const cubeArray = cubes.trim().split(" ");

                // Make the number a number
                cubeArray[0] = Number(cubeArray[0]);

                // Perform a test to determine if the pair passes
                cubeArray[0] > cubeObject[cubeArray[1]] && (pass = false);
            });
        });
        // If pass is true, push the gameNumber to the passedGames array
        pass && passedGames.push(gameNumber);
    });
    // Console.log the total number of passedGames
    console.log(passedGames.reduce((a, b) => a + b));
};

// possible(smallData);
// possible(data);

// Function to determine which games are possible
function needed(testData) {
    // Create an empty array to contain all passing numbers
    const gamePowers = [];

    // Map through the data
    testData.map(elem => {
        // Create arrays for each colour
        const redArray = [];
        const greenArray = [];
        const blueArray = [];

        // Split the string and assign the game number to a variable
        const gameNumber = Number(elem.split(":")[0].substring(5));

        // Split the string into the individual pulls as an array 
        const pulledArray = elem.split(":")[1].split(";");

        // Split the strings into an array of the colour number pairs
        pulledArray.map(e => {
            // Split at the commas
            const commaSplit = e.split(",");

            // Split the pairs and trim whitespace
            commaSplit.map(cubes => {
                // Split and strim the strings
                const cubeArray = cubes.trim().split(" ");

                // Make the number a number
                cubeArray[0] = Number(cubeArray[0]);

                // Switch statement to push the pair number to the associated array
                switch (cubeArray[1]) {
                    case "red":
                        redArray.push(cubeArray[0]);
                        break;
                    case "green":
                        greenArray.push(cubeArray[0]);
                        break;
                    case "blue":
                        blueArray.push(cubeArray[0]);
                        break;
                }

            });
        });
        // Set the max for each colour array to a variable
        const redCubes = Math.max(...redArray);
        const greenCubes = Math.max(...greenArray);
        const blueCubes = Math.max(...blueArray);
 
        // Push the max cubes of each colour multiplied together to the gamePowers array
        gamePowers.push((redCubes * greenCubes * blueCubes));
    });
    // Console.log the total value of the gamePowers array
    console.log(gamePowers.reduce((a, b) => a + b))
};

needed(smallData);
needed(data);