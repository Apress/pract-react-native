import React from "react";
import { createSwitchNavigator } from "react-navigation";
import GameHomeScreen from "./GameScreen-Home";
import { GameLeaderboardScreen } from "./GameScreen-Leaderboard";
import { GameQuestionScreen } from "./GameScreen-Question";


// Create a SwitchNavigator for this screen.
export default createSwitchNavigator(

  /* ----------  Routes. ----------  */
  {
    GameHomeScreen : { screen : GameHomeScreen },
    GameLeaderboardScreen : { screen : GameLeaderboardScreen },
    GameQuestionScreen : { screen : GameQuestionScreen }
  },

  /* ----------  Options. ----------  */
  {
    headerMode : "none",
    initialRouteName : "GameHomeScreen"
  }

); /* End SwitchNavigator definition. */
