import React from "react";
import { StyleSheet, Text, View } from "react-native";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },

  /* Style for the spacer View on the top and bottom. */
  spacer : {
    flex : .2
  },

  /* Style for the container around each line of text. */
  textContainer : {
    flex : .15,
    justifyContent : "center",
    alignItems : "center"
  },

  /* Style for the title text. */
  textTitle : {
    fontWeight : "bold",
    fontSize : 20
  },

  /* Style for the version text. */
  textVersion : {
    fontWeight : "bold",
    fontSize : 18
  },

  /* Style for the source text. */
  textSource : {
    fontWeight : "bold",
    fontSize : 16
  },

  /* Style for the author text. */
  textAuthor : {
    fontWeight : "bold",
    fontSize : 14
  }

}); /* End stylesheet. */


/**
 * Main class of this component.
 */
export default class AboutScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);

  } /* End constructor. */


  /**
   * Component render().
   */
  render() {

    return (
      <View style={styles.outerContainer}>
        <View style={styles.spacer} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>RNTrivia (React Native Trivia)</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textVersion}>v1.0</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textSource}>Published in the Apress book</Text>
          <Text style={styles.textSource}>Practical React Native Projects</Text>
          <Text style={styles.textSource}>in 2018</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textAuthor}>By Frank W. Zammetti</Text>
        </View>
        <View style={styles.spacer} />
      </View>
    );

  } /* End render(). */


} /* End class. */
