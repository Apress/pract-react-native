import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import AboutScreen from "./shared/AboutScreen";
import GameScreen from "./shared/GameScreen";
import InfoScreen from "./shared/InfoScreen";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Styles for the tab icons. */
  tabIcons : {
    width : 32,
    height : 32
  }

}); /* End stylesheet. */


// noinspection JSUnusedGlobalSymbols
/**
 * Construct TabNavigator, the main container for our UI.
 */
export default createBottomTabNavigator(

  /* ---------- Routes. ----------  */
  {

    GameScreen : {
      screen : GameScreen,
      navigationOptions : {
        tabBarLabel : "Game",
        tabBarIcon : ( {tintColor}) => (
          <Image source={ require("../images/icon-game.png") }
            style={[ styles.tabIcons, { tintColor : tintColor } ]}
          />
        )
      }
    }, /* End GameScreen. */

    InfoScreen : {
      screen : InfoScreen,
      navigationOptions : {
        tabBarLabel : "Info",
        tabBarIcon : ( {tintColor}) => (
          <Image source={ require("../images/icon-info.png") }
            style={[ styles.tabIcons, { tintColor : tintColor } ]}
          />
        )
      }
    }, /* End InfoScreen. */

    AboutScreen : {
      screen : AboutScreen,
      navigationOptions : {
        tabBarLabel : "About",
        tabBarIcon : ( {tintColor} ) => (
          <Image source={ require("../images/icon-about.png") }
            style={[ styles.tabIcons, { tintColor : tintColor } ]}
          />
        )
      }
    } /* End AboutScreen. */

  }, /* End routes. */

  /* ---------- Options. ---------- */
  {
    initialRouteName : "GameScreen",
    animationEnabled : true,
    swipeEnabled : true,
    backBehavior : "none",
    lazy : false,
    tabBarPosition : "bottom",
    tabBarOptions : {
      activeTintColor : "#ff0000",
      showIcon : true
    }
  } /* End options. */

); /* End TabNavigator definition. */
