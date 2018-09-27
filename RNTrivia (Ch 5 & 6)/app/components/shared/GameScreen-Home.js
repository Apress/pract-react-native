import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CoreCode from "../../CoreCode";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  }

}); /* End stylesheet. */


/**
 * HomeScreen class.
 */
export default class GameHomeScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);
    CoreCode.mainNavigator = inProps.navigation;

  } /* End constructor. */


  /**
   * Component render().
   */
  render() {

    return (
      <View style={styles.outerContainer}>
        <Image source={require("../../images/logo.png")} />
      </View>
    );

  } /* End render(). */


} /* End class. */
