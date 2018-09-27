import { Vibration } from "react-native";
import { Toast } from "native-base";
import io from "socket.io-client";
import {
  answerButtonHighlight, resetAllButtons, setCurrentStatus, setGameData,
  setEndGameMessage, setPlayerID, setQuestion, showHideModal,
  updateAnswerButtonLabel, updateLeadboard
} from "./state/actions";
import store from "./state/store";


/**
 * #############################################################################
 * Core code of the app lives in this singleton.
 * #############################################################################
 */
const CoreCode = {


  // The IP address of the server.
  serverIP : "192.168.1.32",

  // Our Socket.io connection to the server.
  io : null,

  // Reference to the main navigator.
  mainNavigator : null,


  /**
   * Starts up the app after getting the user's name.
   */
  startup : () => {

    // Gotta enter a name of at least two characters if not the admin.
    if (!store.getState().modals.isAdmin &&
      (store.getState().playerInfo.name == null ||
      store.getState().playerInfo.name.trim() === "" ||
      store.getState().playerInfo.name.length === 1)
    ) {
      return;
    }

    // Hide Name Prompt Modal.
    store.dispatch(showHideModal("namePrompt", false));

    // Open a socket.io-based connection to the server.
    CoreCode.io = io(`http://${CoreCode.serverIP}`);

    // Hook socket handler events (which depends on whether user is admin
    // or not).
    if (store.getState().modals.isAdmin) {
      CoreCode.io.on("connected", function() { console.log("ADMIN CONNECTED"); });
      CoreCode.io.on("adminMessage", CoreCode.adminMessage);
      // Now show the admin Modal.
      store.dispatch(showHideModal("admin", true));
    } else {
      CoreCode.io.on("connected", CoreCode.connected);
      CoreCode.io.on("validatePlayer", CoreCode.validatePlayer);
      CoreCode.io.on("newGame", CoreCode.newGame);
      CoreCode.io.on("nextQuestion", CoreCode.nextQuestion);
      CoreCode.io.on("answerOutcome", CoreCode.answerOutcome);
      CoreCode.io.on("endGame", CoreCode.endGame);
    }

  }, /* End startup(). * /


  /**
   * Handles connected messages from the server.
   */
  connected : function(inData) {

    console.log("connected()", inData);

    // Ask the server to validate the playerID.
    CoreCode.io.emit("validatePlayer", {
      playerName : store.getState().playerInfo.name
    });

  }, /* End connected(). */


  /**
   * Handles validatePlayer messages from the server.
   *
   * @param inData The data object from the server.
   */
  validatePlayer : function(inData) {

    console.log("validatePlayer()", inData);

    // Record the playerID.
    store.dispatch(setPlayerID(inData.playerID));

    // Update and show the leaderboard.  This player will wait for the
    // next question.
    // noinspection JSUnresolvedVariable
    if (inData.inProgress) {
      inData.gameData.asked = inData.asked;
      store.dispatch(setGameData(inData.gameData));
      store.dispatch(updateLeadboard(inData.leaderboard));
      CoreCode.mainNavigator.navigate("GameLeaderboardScreen");
    }

  }, /* End validatePlayer(). */


  /**
   * Handles newGame messages from the server.
   *
   * @param inData The data object from the server.
   */
  newGame : function(inData) {

    console.log("newGame()", inData);

    // Hide End Game Modal.
    store.dispatch(showHideModal("endGame", false));

    // Update the game info and leaderboard.
    inData.gameData.asked = inData.asked;
    store.dispatch(setGameData(inData.gameData));
    store.dispatch(updateLeadboard(inData.leaderboard));

    // Show the leaderboard screen.
    CoreCode.mainNavigator.navigate("GameLeaderboardScreen");

  }, /* End newGame(). */


  /**
   * Handles nextQuestion messages from the server.
   *
   * @param inData The data object from the server.
   */
  nextQuestion : function(inData) {

    console.log("nextQuestion()", inData);

    // Make sure we start out with no selected answer.
    store.dispatch(answerButtonHighlight(-1));

    // Show the question.
    store.dispatch(setQuestion(inData.question));

    // Populate the answers and reset their state.
    for (let i = 0; i < 6; i++) {
      // noinspection JSUnresolvedVariable
      store.dispatch(updateAnswerButtonLabel(i, inData.answers[i]));
    }

    // The button labels won't be reflected on the screen unless we force them
    // to update, which is done by resetting the type of all buttons (not sure
    // why this is).
    store.dispatch(resetAllButtons());

    // Show the question screen.
    CoreCode.mainNavigator.navigate("GameQuestionScreen");

  }, /* End nextQuestion(). */


  /**
   * Handles answerOutcome messages from the server.
   *
   * @param inData The data object from the server.
   */
  answerOutcome : function(inData) {

    console.log("answerOutcome()", inData);

    let msg = "Sorry!  That's not correct :(";
    let type = "danger";
    // noinspection JSUnresolvedVariable
    if (inData.correct) {
      msg = "Hooray!  You got it right :)";
      type = "success";
    }

    // Update the game info.
    inData.gameData.asked = inData.asked;
    store.dispatch(setGameData(inData.gameData));

    // Show the leaderboard and a toast message telling the player the result.
    store.dispatch(updateLeadboard(inData.leaderboard));
    CoreCode.mainNavigator.navigate("GameLeaderboardScreen");
    Toast.show({ text: msg, buttonText : "Ok", type : type, duration : 3000 });
    Vibration.vibrate(1000);

  }, /* End answerOutcome(). */


  /**
   * Handles endGame messages from the server.
   *
   * @param inData The data object from the server.
   */
  endGame : function(inData) {

    console.log("endGame()", inData);

    // Show the final game info.
    inData.gameData.asked = inData.asked;
    store.dispatch(setGameData(inData.gameData));

    // Show the final leaderboard.
    store.dispatch(updateLeadboard(inData.leaderboard));
    CoreCode.mainNavigator.navigate("GameLeaderboardScreen");

    if (inData.leaderboard[0].playerID === store.getState().playerInfo.id) {

      store.dispatch(setEndGameMessage("Congratulations! You were the winner!"));
      store.dispatch(showHideModal("endGame", true));

    } else {

      // Nope, didn't quite pull off the wun, so figure out what place they finished in and the appropriate text to
      // show.  We have to find their index in the array, and then attach an appropriate ordinal suffix to it.
      let place = "";
      let index = inData.leaderboard.findIndex((inPlayer) => inPlayer.playerID === CoreCode.playerID);
      index++;
      const j = index % 10;
      const k = index % 100;
      if (j === 1 && k !== 11) {
        place = `${index}st`;
      } else if (j === 2 && k !== 12) {
        place = `${index}nd`;
      } else if (j === 3 && k !== 13) {
        place = `${index}rd`;
      } else {
        place = `${index}th`;
      }

      store.dispatch(setEndGameMessage(
        `Sorry, you didn't win. You finished in ${place} place.`)
      );
      store.dispatch(showHideModal("endGame", true));

    }

  }, /* End endGame(). */


  /**
   * Handles showing messages for the admin sent from the server.
   *
   * @param inData The data object from the server.
   */
  adminMessage : function(inData) {

    console.log("adminMessage()", inData);

    store.dispatch(setCurrentStatus(inData.msg));

  } /* End adminMessage(). */


}; /* CoreCode. */


export default CoreCode;
