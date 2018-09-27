import React from "react";
import { createDrawerNavigator } from "react-navigation";
import AboutScreen from "./shared/AboutScreen";
import GameScreen from "./shared/GameScreen";
import InfoScreen from "./shared/InfoScreen";


// noinspection JSUnusedGlobalSymbols
/**
 * Construct DrawerNavigator, the main container for our UI.
 */
export default createDrawerNavigator(

  /* ---------- Routes. ----------  */
  {

    GameScreen : {
      screen : GameScreen,
      navigationOptions: () => ({ title : "Game" }),
    }, /* End GameScreen. */

    InfoScreen : {
      screen : InfoScreen,
      navigationOptions: () => ({ title : "Info" }),
    }, /* End InfoScreen. */

    AboutScreen : {
      screen : AboutScreen,
      navigationOptions: () => ({ title : "About" }),
    } /* End AboutScreen. */

  }, /* End routes. */

  /* ---------- Options. ---------- */
  {
    initialRouteName : "GameScreen",
    backBehavior : "none"
  } /* End options. */

); /* End DrawerNavigator definition. */
