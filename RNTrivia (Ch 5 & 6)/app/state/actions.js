// Action types.  These must be unique in both name and value.
exports.ANSWER_BUTTON_HIGHLIGHT = "abh";
exports.RESET_ALL_BUTTONS = "rab";
exports.SET_CURRENT_STATUS = "scs";
exports.SET_END_GAME_MESSAGE = "segm";
exports.SET_GAME_DATA = "sgd";
exports.SET_IS_ADMIN = "sia";
exports.SET_PLAYER_ID = "spi";
exports.SET_PLAYER_NAME = "spn";
exports.SET_QUESTION = "scq";
exports.SHOW_HIDE_MODAL = "shm";
exports.UPDATE_ANSWER_BUTTON_LABEL = "uabl";
exports.UPDATE_LEADERBOARD = "ul";


/**
 * For showing/hiding the name prompt dialog when user is new to the server.
 *
 * @param inModalName Which modal to show/hide ("endGame" or "namePrompt");
 * @param inVisible   True to show the modal, false to hide it.
 */
exports.showHideModal = (inModalName, inVisible) => {

  return {
    type : exports.SHOW_HIDE_MODAL,
    payload : { modalName : inModalName, visible : inVisible }
  };

}; /* showHidePromptModal(). */


/**
 * For settings the player's ID.
 *
 * @param inID The player's ID.
 */
exports.setPlayerID = (inID) => {

  return {
    type : exports.SET_PLAYER_ID,
    payload : { id : inID }
  };

}; /* setPlayerID(). */


/**
 * For settings the player's name on NamePromptModal.
 *
 * @param inName The player's name.
 */
exports.setPlayerName = (inName) => {

  return {
    type : exports.SET_PLAYER_NAME,
    payload : { name : inName }
  };

}; /* setPlayerName(). */


/**
 * For settings the current game data for the Info screen.
 *
 * @param inGameData The gameData object returned by the server.
 */
exports.setGameData = (inGameData) => {

  return {
    type : exports.SET_GAME_DATA,
    payload : { gameData : inGameData }
  };

}; /* setGameData(). */


/**
 * For when an answer button is tapped.
 *
 * @param inButtonNumber The number of the button (0-5) that was tapped.
 */
exports.answerButtonHighlight = (inButtonNumber) => {

  return {
    type : exports.ANSWER_BUTTON_HIGHLIGHT,
    payload : { buttonNumber : inButtonNumber }
  };

}; /* End answerButtonHighlight().  */


/**
 * For when a new question is shown.  Called once for each answer button.
 *
 * @param inButtonNumber The button number (0-5) who's label is being updated.
 * @param inLabel        The new label for the button.
 */
exports.updateAnswerButtonLabel = (inButtonNumber, inLabel) => {

  return {
    type : exports.UPDATE_ANSWER_BUTTON_LABEL,
    payload : { buttonNumber : inButtonNumber, label : inLabel }
  };

}; /* End updateAnswerButtonLabel().  */


/**
 * For when a new question is shown.  Called after all labels have been updated.
 */
exports.resetAllButtons = () => {

  return {
    type : exports.RESET_ALL_BUTTONS,
    payload : { }
  };

}; /* End resetAllButtons().  */


/**
 * For when a new question is shown.
 *
 * @param inQuestion The new question.
 */
exports.setQuestion = (inQuestion) => {

  return {
    type : exports.SET_QUESTION,
    payload : { question : inQuestion}
  };

}; /* End setQuestion().  */


/**
 * For when the game ends.
 *
 * @param inMessage The message to show in the modal.
 */
exports.setEndGameMessage = (inMessage) => {

  return {
    type : exports.SET_END_GAME_MESSAGE,
    payload : { message : inMessage}
  };

}; /* End setEndGameMessage().  */


/**
 * For when the leaderboard data needs to be updated.
 *
 * @param inListData The leaderboard data as returned by the server.
 */
exports.updateLeadboard = (inListData) => {

  return {
    type : exports.UPDATE_LEADERBOARD,
    payload : { listData : inListData }
  };

}; /* End updateLeaderboard(). */


/**
 * For when the user says they are the admin.
 *
 * @param inIsAdmin True if the user is admin, false if not.
 */
exports.setIsAdmin = (inIsAdmin) => {

  return {
    type : exports.SET_IS_ADMIN,
    payload : { isAdmin : inIsAdmin }
  };

}; /* End setIsAdmin(). */


/**
 * For showing the current game status on the admin screen.
 *
 * @param inCurrentStatus The current status of the game.
 */
exports.setCurrentStatus = (inCurrentStatus) => {

  return {
    type : exports.SET_CURRENT_STATUS,
    payload : { currentStatus : inCurrentStatus }
  };

}; /* End setCurrentStatus(). */
