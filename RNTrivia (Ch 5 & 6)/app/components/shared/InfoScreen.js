import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    justifyContent : "center",
    marginTop : 50,
    marginLeft : 20,
    marginRight : 20
  },

  /* Style for the Identification Card container. */
  identificationCardContainer : {
    height : 150,
    marginBottom : 20
  },

  /* Style for the Current Game Card container. */
  currentGameCardContainer : {
    height : 360
  },

  /* Style for the header text. */
  headerText : {
    fontWeight : "bold",
    fontSize : 20,
    color : "red"
  },

  /* Style for the container View in the Current Game Card. */
  fieldContainer : {
    flexDirection : "row"
  },

  /* Style for the field labels on the Current Game Card. */
  fieldLabel : {
    width : 100,
    fontWeight : "bold"
  },

  /* Style for adding spacing after each field in the Current Game Card. */
  fieldSpacing : {
    marginBottom : 12
  }

}); /* End stylesheet. */


/**
 * Main class of this component.
 */
class InfoScreen extends React.Component {


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

        <View style={styles.identificationCardContainer}>
          <Card>
            <CardItem header>
              <Text style={styles.headerText}>Identification</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Player Name</Text>
                  <Text>{this.props.playerName}</Text>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Player ID</Text>
                  <Text>{this.props.playerID}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>

        <View style={styles.currentGameCardContainer}>
          <Card>
            <CardItem header>
              <Text style={styles.headerText}>Current Game</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Asked</Text>
                  <Text>{this.props.asked}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Answered</Text>
                  <Text>{this.props.answered}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Points</Text>
                  <Text>{this.props.points}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Right</Text>
                  <Text>{this.props.right}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Wrong</Text>
                  <Text>{this.props.wrong}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Total Time</Text>
                  <Text>{this.props.totalTime}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Slowest</Text>
                  <Text>{this.props.slowest}</Text>
                </View>
                <View style={[ styles.fieldContainer, styles.fieldSpacing ]}>
                  <Text style={styles.fieldLabel}>Fastest</Text>
                  <Text>{this.props.fastest}</Text>
                </View>
                <View style={ styles.fieldContainer }>
                  <Text style={styles.fieldLabel}>Average</Text>
                  <Text>{this.props.average}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>

      </View>
    );

  } /* End render(). */


} /* End class. */


/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
  return {
    playerName : inState.playerInfo.name,
    playerID : inState.playerInfo.id,
    asked : inState.gameData.asked,
    answered : inState.gameData.answered,
    points : inState.gameData.points,
    right : inState.gameData.right,
    wrong : inState.gameData.wrong,
    totalTime : inState.gameData.totalTime,
    slowest : inState.gameData.slowest,
    fastest : inState.gameData.fastest,
    average : inState.gameData.average

  };
};


// Export components.
export default connect(mapStateToProps)(InfoScreen);
