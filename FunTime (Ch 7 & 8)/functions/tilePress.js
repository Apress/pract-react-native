import { Animated } from "react-native";


/**
 * Handle press events on the tiles.
 *
 * @param inRefID The reference ID of the pressed tiled.
 */
module.exports = function(inRefID) {

  // Abort if control menu is currently visible.
  if (this.state.controlMenuVisible) { return; }

  // Start by getting a hold of the physical tile component.
  const tile = this.state.refs[inRefID];

  // Find this tile in the virtualTiles array based on inRefID and get a
  // reference to the virtual tile object and record the tile's location
  // in the matrix.
  const virtualTiles = this.state.virtualTiles;
  let virtualTile = null;
  let tileLoc = null;
  const numberOfTilesAcross = this.state.numberOfTilesAcross;
  const numberOfTilesDown = this.state.numberOfTilesDown;
  for (let row = 0; row < numberOfTilesDown; row++) {
    const rowArray = virtualTiles[row];
    for (let col = 0; col < numberOfTilesAcross; col++) {
      const vt = rowArray[col];
      if (vt.refID === inRefID) {
        virtualTile = vt;
        tileLoc = { row : row, col : col };
        break;
      }
    }
  }

  // Get references to the virtual tiles around this one in the four
  // cardinal directions.
  let virtualTileLeft = null;
  let virtualTileRight = null;
  let virtualTileAbove = null;
  let virtualTileBelow = null;
  try {
    virtualTileLeft = virtualTiles[tileLoc.row][tileLoc.col - 1];
  } catch (e) { }
  try {
    virtualTileRight = virtualTiles[tileLoc.row][tileLoc.col + 1];
  } catch (e) { }
  try {
    virtualTileAbove = virtualTiles[tileLoc.row - 1][tileLoc.col];
  } catch (e) { }
  try {
    virtualTileBelow = virtualTiles[tileLoc.row + 1][tileLoc.col];
  } catch (e) { }

  // Get the width and height of an individual tile.
  const tileWidth = this.state.tileWidth;
  const tileHeight = this.state.tileHeight;

  // Start out assuming the tile won't move.
  let moveTile = false;

  // Warning: using an internal method like this is dangerous!  But,
  // sometimes it's exactly what you need.
  let toLeftValue = tile.props.style[1].left.__getValue();
  let toTopValue = tile.props.style[1].top.__getValue();

  // If the tile to the left is empty, move this tile there.
  if (virtualTileLeft && parseInt(virtualTileLeft.tileNum) === 0) {
    toLeftValue = toLeftValue - tileWidth;
    moveTile = true;
    // Swap the two virtual tiles in the array.
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileLeft;
    virtualTiles[tileLoc.row][tileLoc.col - 1] = virtualTile;
  }

  // If the tile to the Right is empty, move this tile there.
  if (virtualTileRight && parseInt(virtualTileRight.tileNum) === 0) {
    toLeftValue = toLeftValue + tileWidth;
    moveTile = true;
    // Swap the two virtual tiles in the array.
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileRight;
    virtualTiles[tileLoc.row][tileLoc.col + 1] = virtualTile;
  }

  // If the tile above is empty, move this tile there.
  if (virtualTileAbove && parseInt(virtualTileAbove.tileNum) === 0) {
    toTopValue = toTopValue - tileHeight;
    moveTile = true;
    // Swap the two virtual tiles in the array.
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileAbove;
    virtualTiles[tileLoc.row - 1][tileLoc.col] = virtualTile;
  }

   // If the tile below is empty, move this tile there.
  if (virtualTileBelow && parseInt(virtualTileBelow.tileNum) === 0) {
    toTopValue = toTopValue + tileHeight;
    moveTile = true;
    // Swap the two virtual tiles in the array.
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileBelow;
    virtualTiles[tileLoc.row + 1][tileLoc.col] = virtualTile;
  }

  // It's time to actually move!  Animate the tile's left and top style
  // props.  One of them won't change, but this way we don't have to do any
  // additional logic.
  const moveDuration = 250;
  let moveCount = this.state.moveCount;
  if (moveTile) {
    moveCount = moveCount + 1;
    // noinspection JSUnresolvedFunction, JSUnresolvedVariable
    Animated.parallel([
      Animated.timing(
        tile.props.style[1].left,
        { toValue : toLeftValue, duration : moveDuration }
      ),
      // noinspection JSUnresolvedFunction
      Animated.timing(
        tile.props.style[1].top,
        { toValue : toTopValue, duration : moveDuration }
      )
    ]).start(global.determineOutcome);
  }

  // Finally, update virtualTiles array and moveCount value in state.
  this.setState({ virtualTiles : virtualTiles, moveCount : moveCount });

};
