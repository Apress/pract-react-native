const fs = require("fs");
const lodash = require("lodash");


const io =
  require("socket.io")(require("http").createServer(function(){}).listen(80));


// Collection of player data objects keyed by playerID.
const players = { };

// Is a game currently in progress?.
let inProgress = false;

// The questions for the game.
let questions = null;

// The current question in play.
let question = null;

// The condensed version of the current question that goes to the players
// (sans answers and info that could be used to cheat.
let questionForPlayers = null;

// The server-local time the current question began.
let questionStartTime = null;

// The number of questions asked during the current game.
let numberAsked = 0;


/**
 * Get a new gameData object.
 */
function newGameData() {

  console.log("newGameData()");

  return { right : 0, wrong : 0, totalTime : 0, fastest : 999999999,
    slowest : 0, average : 0, points : 0, answered : 0, playerName : null
  };

} /* End newGameData(). */


/**
 * Recalculate the leaderboard and return the new state.
 */
function calculateLeaderboard() {

  console.log("calculateLeaderboard()");

  // Get our players into an array.
  const playersArray = [ ];
  for (const playerID in players) {
    if (players.hasOwnProperty(playerID)) {
      const player = players[playerID];
      playersArray.push({ playerID : playerID, playerName : player.playerName,
      points : player.points });
    }
  }

  // Now sort that array based on points.
  playersArray.sort((inA, inB) => {
    const pointsA = inA.points;
    const pointsB = inB.points;
    if (pointsA > pointsB) {
      return -1;
    } else if (pointsA < pointsB) {
      return 1;
    } else {
      return 0;
    }
  });

  return playersArray;

} /* End calculateLeaderboard(). */


// noinspection JSUnresolvedFunction
/**
 * Handle the socket connection event.  All other events must be hooked up
 * inside this.
 */
io.on("connection", io => {


  console.log("Connection established with a client");


  // ---------------------------------------------------------------------------
  // Player message handlers.
  // ----------------------------------------------------------------------------


  /**
   * When a player first connects, emit a message that will cause it to send
   * its playerID via a validatePlayer message.
   */
  io.emit("connected", { });


  /**
   * Once connected, the player calls this to validate them.  This really just
   * adds them to the players collection and generates a playerID, sending it
   * back to the player, along with the current gameDate object for them.
   */
  io.on("validatePlayer", inData => {

    try {

      console.log("validatePlayer", inData);

      // Construct the object that will be the response.
      const responseObject = { inProgress : inProgress,
        gameData : newGameData(), leaderboard : calculateLeaderboard(),
        asked : numberAsked
      };
      responseObject.gameData.playerName = inData.playerName;

      // First, give them an ID.
      responseObject.playerID = `pi_${new Date().getTime()}`;

      // Now, make sure their name is unique.
      for (const playerID in players) {
        if (players.hasOwnProperty(playerID)) {
          if (inData.playerName === players[playerID].playerName) {
            responseObject.gameData.playerName += `_${new Date().getTime()}`;
          }
        }
      }

      // Finally, save their gameData object and emit response message.
      players[responseObject.playerID] = responseObject.gameData;
      io.emit("validatePlayer", responseObject);

    // Handle any unexpected problems, ensuring the server doesn't go down.
    } catch (inException) {
      console.log(`${inException}`);
    }

  }); /* End validatePlayer handler. */


  /**
   * Triggered when the player clicks the Submit button to submit their answer.
   */
  io.on("submitAnswer", inData => {

    try {

      console.log("submitAnswer", inData);

      // Get the gameData instance for this player.
      const gameData = players[inData.playerID];

      // By default, assume they answered wrong.
      let correct = false;

      // Bump up the count of how many questions this player has answered.
      gameData.answered++;

      // noinspection JSUnresolvedVariable
      if (question.answer === inData.answer) {

        // They got it right, so bump up their right count, but also reduce
        // their wrong count, since that was incremented when the question
        // began.
        players[inData.playerID].right++;
        players[inData.playerID].wrong--;

        // See how long it took and update the time-related values.
        const time = new Date().getTime() - questionStartTime;
        gameData.totalTime = gameData.totalTime + time;
        if (time > gameData.slowest) {
          gameData.slowest = time;
        }
        if (time < gameData.fastest) {
          gameData.fastest = time;
        }
        gameData.average = Math.trunc(gameData.totalTime / numberAsked);

        // Calculate the points to add.  This is based on a max amount of time
        // allowed to answer.  For example, 15 seconds means they start off
        // getting 60 points for a correct answer (maxTimeAllowed*4).  But
        // then, for each quarter second taken to answer (which is where the 4
        // comes from) we subtract 1 point, capping the loss at the max points
        // they could get.  So, in the end, if they take more than
        // maxTimeAllowed seconds to answer then they'll get no points,
        // otherwise they'll get something less than or equal to
        // maxTimeAllowed*4.  However, it's a bit unfair to take ALL their
        // points, so at the end we give them 10 points regardless of how long
        // they took to answer.
        const maxTimeAllowed = 15;
        gameData.points = gameData.points + (maxTimeAllowed * 4);
        gameData.points = gameData.points -
          Math.min(Math.max(Math.trunc(time / 250), 0), (maxTimeAllowed * 4));
        gameData.points = gameData.points + 10;
        correct = true;

      }

      // Send the player the outcome, and tell all players to update the
      // leaderboard.
      io.emit("answerOutcome", { correct : correct, gameData : gameData,
        asked : numberAsked, leaderboard : calculateLeaderboard()
      });

    // Handle any unexpected problems, ensuring the server doesn't go down.
    } catch (inException) {
      console.log(`${inException}`);
    }

  }); /* End submitAnswer handler. */


  // ---------------------------------------------------------------------------
  // Admin message handlers.
  // ---------------------------------------------------------------------------


  /**
   * Triggered when the admin clicks the New Game button to start a new game.
   */
  io.on("adminNewGame", () => {

    try {

      console.log("adminNewGame");

      // Reset tracking variables
      question = null;
      questionForPlayers = null;
      numberAsked = 0;
      inProgress = true;

      // Read in the questions file.  Have to do this at the start of every
      // game because each call to nextQuestion() removes a question from the
      // array.
      // noinspection JSUnresolvedVariable
      questions = (JSON.parse(fs.readFileSync("questions.json", "utf8"))).questions;

      // Reset all current players to a have a new gameData object.  Remember
      // that we'll be overwriting the gameData object, which includes the
      // player's name, so we'll need to capture that first and carry it over.
      for (const playerID in players) {
        if (players.hasOwnProperty(playerID)) {
          const playerName = players[playerID].playerName;
          players[playerID] = newGameData();
          players[playerID].playerName = playerName;
        }
      }

      // Tell all connected players that a new game is beginning.
      const responseObject = { inProgress : inProgress, question : null,
        playerID : null, gameData : newGameData(), asked : numberAsked,
        leaderboard : calculateLeaderboard()
      };
      const gd = newGameData();
      gd.asked = 0;
      // noinspection JSUnresolvedVariable
      io.broadcast.emit("newGame", responseObject);

      // Tell the admin that a game has started.
      io.emit("adminMessage", { msg : "Game started" });

    // Handle any unexpected problems, ensuring the server doesn't go down.
    } catch (inException) {
      console.log(`${inException}`);
    }

  }); /* End adminNewGame handler. */


  /**
   * Triggered when the admin clicks the Next Question button to show a new
   * question.  All connected players are told what the question is.
   */
  io.on("adminNextQuestion", () => {

    try {

      console.log("adminNextQuestion");

      // Show a message if the admin tried to send a question but there's no
      // game in progress.
      if (!inProgress) {
        io.emit("adminMessage", { msg : "There is no game in progress" });
        return;
      }

      // Tell the admin when we've run out of questions so they can end the
      // game.
      if (questions.length === 0) {
        io.emit("adminMessage", { msg : "There are no more questions" });
        return;
      }

      // Bump up all players' wrong count.  This will be overridden if each
      // get it right of course, but this way we count questions that haven't
      // been answered in time as wrong too.
      for (const playerID in players) {
        if (players.hasOwnProperty(playerID)) {
          players[playerID].wrong++;
        }
      }

      // Randomly choose a question and remove it from the questions array so
      // it doesn't get chosen twice.
      let choice = Math.floor(Math.random() * questions.length);
      question = questions.splice(choice, 1)[0];

      // Construct a question object for the players.  This consists of the
      // question and 6 possible answers, chosen at random, and including the
      // correct choice.
      questionForPlayers = { question : question.question, answers : [ ] };

      // Clone the decoys array so we can "reduce" it as we chose answers.
      // noinspection JSUnresolvedVariable
      const decoys = question.decoys.slice(0);
      for (let i = 0; i < 5; i++) {
        let choice = Math.floor(Math.random() * decoys.length);
        questionForPlayers.answers.push(decoys.splice(choice, 1)[0]);
      }

      // Don't forget the correct answer!
      // noinspection JSUnresolvedVariable
      questionForPlayers.answers.push(question.answer);

      // Now, to ensure the correct answer isn't always last, randomize the
      // answers.
      questionForPlayers.answers = lodash.shuffle(questionForPlayers.answers);

      // Count off how many questions have been asked (since we can't tell
      // this from the number of items in the questions array because we
      // reduce it with each question asked).
      numberAsked++;

      // Record the start time of this question.
      questionStartTime = new Date().getTime();

      // Tell all players that it's time for a question.
      // noinspection JSUnresolvedVariable
      io.broadcast.emit("nextQuestion", questionForPlayers);

      // Tell the admin that a question is in play.
      io.emit("adminMessage", { msg : "Question in play" });

    // Handle any unexpected problems, ensuring the server doesn't go down.
    } catch (inException) {
      console.log(`${inException}`);
    }

  }); /* End adminNextQuestion handler. */


  /**
   * Triggered when the admin clicks the End Game button to end the game.
   */
  io.on("adminEndGame", () => {

    try {

      console.log("adminEndGame");

      // Show a message if the admin tried to end the game, but there's
      // no game in progress.
      if (!inProgress) {
        io.emit("adminMessage", { msg : "There is no game in progress" });
        return;
      }

      // Tell all the players about the end of the game and the final
      // standings.
      const leaderboard = calculateLeaderboard();
      // noinspection JSUnresolvedVariable
      io.broadcast.emit("endGame", { leaderboard : leaderboard });

      // Reset variables.
      inProgress = false;
      questions = null;
      question = null;
      questionForPlayers = null;
      questionStartTime = null;
      numberAsked = 0;
      for (const playerID in players) {
        if (players.hasOwnProperty(playerID)) {
          const playerName = players[playerID].playerName;
          players[playerID] = newGameData();
          players[playerID].playerName = playerName;
        }
      }

      // Tell the admin that the game has ended.
      io.emit("adminMessage", { msg : "Game ended" });

    // Handle any unexpected problems, ensuring the server doesn't go down.
    } catch (inException) {
      console.log(`${inException}`);
    }

  }); /* End adminEndGame handler. */


}); /* End connection event handler. */


console.log("Server ready");
