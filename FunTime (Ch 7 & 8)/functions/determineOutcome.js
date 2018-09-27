const lodash = require("lodash");


/**
 * Checks to see if the player won after a move.
 */
module.exports = function() {

  // Flatten the virtualTiles array into a NEW array (in other words: take
  // the multi-dimensional array and produce a single-dimensional one).
  // We can't mess with the original array remember!
  const virtualTiles = lodash.flattenDeep(this.state.virtualTiles);

  // Create an array who's length matches virtualTilesClone and who's content
  // is just numbers, starting at one, ascending by one.  Or, to put it
  // another way: create an array of numbers in the correct order that
  // represents a win.
  const numberOfTiles =
    this.state.numberOfTilesAcross * this.state.numberOfTilesDown;
  const winningArray =
    Array.from({ length : numberOfTiles - 1 }, (v, k) => k + 1);
  // Now, iterate over virtualTiles array and see if the tileNum on each
  // matches the corresponding element in the winningArray, skipping the
  // empty tile.
  let playerWon = true;
  for (let i = 0; i < virtualTiles.length; i++) {
    if (virtualTiles[i].tileNum !== 0 &&
      virtualTiles[i].tileNum !== winningArray[i]
    ) {
      playerWon = false;
      break;
    }
  }

  // If they won, show the you won screen and disable the control menu button.
  if (playerWon) {
    this.setState({ wonVisible : true, controlMenuButtonDisabled : true });
  }

};
