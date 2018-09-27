const lodash = require("lodash");


// Set to true to quickly test the win scenario.  Note: this will only work
// for a 3x3 grid!
const testWin = true;


// noinspection JSMethodCanBeStatic
/**
 * Generate a random array of tile numbers that will be the starting
 * arrangement of tiles, ensuring that the chosen arrangement is actually
 * solvable.
 */
module.exports = function() {

  // Grab the size of the matrix from state.
  const numberOfTilesAcross = this.state.numberOfTilesAcross;
  const numberOfTilesDown = this.state.numberOfTilesDown;

  // Generate an ordered array of tile numbers.
  let tileNumbers = [];
  for (let i = 1; i < numberOfTilesAcross * numberOfTilesDown; i++) {
    tileNumbers.push(i);
  }

  // We'll keep trying until we come up with a solvable arrangement.
  let isSolvable = false;
  while (!isSolvable) {

    // Shuffle up the tile numbers.
    tileNumbers = lodash.shuffle(tileNumbers);
    if (testWin) {
      tileNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ];
      isSolvable = true;
      continue;
    }

    // Now count how many inversions there are.
    const numberOfTiles = numberOfTilesAcross * numberOfTilesDown;
    let inversionCount = 0;
    for (let i = 0; i < numberOfTiles - 1; i++) {
      for (let j = 1; j < numberOfTiles; j++) {
        if (tileNumbers[j] && tileNumbers[i] &&
          tileNumbers[i] > tileNumbers[j]
        ) {
          inversionCount = inversionCount +1;
        }
      }
    }

    // Simple test to determine if this arrangement is solvable based on the
    // number of inversions.
    isSolvable = (inversionCount % 2 === 0);

  } // End while.

  return tileNumbers;

};
