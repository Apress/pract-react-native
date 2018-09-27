import React from "react";
import { Constants } from "expo";
import { Image, Platform } from "react-native";
import { TabNavigator } from "react-navigation";
import { PeopleScreen } from "./screens/PeopleScreen";
import { DecisionScreen } from "./screens/DecisionScreen";
import { RestaurantsScreen } from "./screens/RestaurantsScreen";


console.log("------------------------------------------------------------");
console.log(`RestaurantChooser starting on ${Platform.OS}`);


// Normalized platform identifier to use when code needs to change between
// Android and iOS.
const platformOS = Platform.OS.toLowerCase();


/**
 * Construct TabNavigator, the main container for our UI.
 */
const tabs = TabNavigator(

  /* ---------- Routes. ----------  */
  {
    PeopleScreen : {
      screen : PeopleScreen,
      navigationOptions : {
        tabBarLabel : "People",
        tabBarIcon : ( { tintColor } ) => (
          <Image source={ require("./images/icon-people.png") }
            style={{ width : 32, height : 32, tintColor : tintColor }}
          />
        )
      }
    }, /* End PeopleScreen. */
    DecisionScreen : {
      screen : DecisionScreen,
      navigationOptions : {
        tabBarLabel : "Decision",
        tabBarIcon : ( { tintColor } ) => (
          <Image source={ require("./images/icon-decision.png") }
            style={{ width : 32, height : 32, tintColor : tintColor }}
          />
        )
      }
    }, /* End DecisionScreen. */
    RestaurantsScreen : {
      screen : RestaurantsScreen,
      navigationOptions : {
        tabBarLabel : "Restaurants",
        tabBarIcon : ( { tintColor } ) => (
          <Image source={ require("./images/icon-restaurants.png") }
            style={{ width : 32, height : 32, tintColor : tintColor }}
          />
        )
      }
    } /* End RestaurantsScreen. */
  }, /* End routes. */

  /* ---------- Options. ---------- */
  {
    initialRouteName : "DecisionScreen",
    animationEnabled : true,
    swipeEnabled : true,
    backBehavior : "none",
    lazy : true,
    /* Tabs go on top for Android, bottom for iOS. */
    tabBarPosition : platformOS === "android" ? "top" : "bottom",
    tabBarOptions : {
      activeTintColor : "#ff0000",
      showIcon : true,
      /* Tabs on Android are overlapped by the status bar, so add some */
      /* padding to fix that. */
      style : {
        paddingTop : platformOS === "android" ? Constants.statusBarHeight : 0
      }
    }
  } /* End options. */

); /* End TabNavigator definition. */


// Export our main component.
export default tabs;
