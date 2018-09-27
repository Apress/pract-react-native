import { Dimensions } from "react-native";


// Height of the control menu button area.
const controlAreaHeight = 80;

// Get width and height of the screen.
const { height, width } = Dimensions.get("window");


// Construct initial state.  This includes:
//
// tiles .... the array of tile View components
// numberOfTilesAcross ........ The default number of tiles across the
//                              matrix.
// numberOfTilesDown .......... The default number of tiles down the matrix.
// screenUsableWidth .......... The "usable" space for the tiles across the
//                              screen.
// screenUsableHeight ......... The "usable" space for the tiles down the
//                              screen (just leaves some space at the top
//                              the control menu button).
// refs ....................... References to the individual tile View
//                              components.
// virtualTiles ............... The array of virtual tile objects.
// tileWidth .................. The width of an individual tile
// tileHeight ................. The height of an individual tile (this and
//                              tileWidth are calculated later in the
//                              buildMatrix() method).
// controlAreaHeight .......... The space the control menu button takes up.
// controlMenuVisible ......... True to show the control menu, false to
//                              hide it.
// controlMenuWidth ........... The width of the control menu.
// controlMenuHeight .......... The height of the control menu.
// controlMenuButtonDisabled .. True if the control menu button is
//                              disabled, false if it's enabled.
// wonVisible ................. Is the you won screen visible?
// moveCount .................. The number of moves the player has made.
// startTime .................. The time the current game began.
module.exports = {
  tiles : [],
  numberOfTilesAcross : 3,
  numberOfTilesDown : 3,
  screenUsableWidth : width,
  screenUsableHeight : height - controlAreaHeight,
  refs : {},
  virtualTiles : null,
  tileWidth : null,
  tileHeight : null,
  controlAreaHeight : controlAreaHeight,
  controlMenuVisible : false,
  controlMenuWidth : 380,
  controlMenuHeight : 480,
  controlMenuButtonDisabled : false,
  wonVisible : false,
  moveCount : 0,
  startTime : new Date().getTime()
};
