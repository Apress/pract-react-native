import React from "react";
import { Alert, StyleSheet, Text as RNText, View } from "react-native";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import CoreCode from "../../CoreCode.js";
import { answerButtonHighlight } from "../../state/actions";
import store from "../../state/store";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "stretch",
    justifyContent : "center",
    marginTop : 50,
    marginLeft : 20,
    marginRight : 20
  },

  /* Style for the question container View. */
  questionContainer : {
    flex : .2,
    justifyContent : "center",
    alignSelf : "center"
  },

  /* Style for the answer buttons container View. */
  answerButtonsContainer : {
    flex : .8,
    alignItems : "center",
    justifyContent : "center"
  },

  /* Container for the Submit Answer button view. */
  submitButtonContainer : {
    justifyContent : "center",
    height : 140
  },

  /* Style for the question text. */
  question : {
    fontWeight : "bold",
    fontSize : 26,
    color : "red",
    textAlign : "center"
  },

  /* Style for the answer buttons. */
  answerButton : {
    marginTop : 20
  },

  /* Style for the Submit Answer button's text. */
  buttonText : {
    fontWeight : "bold",
    color : "white"
  }

}); /* End stylesheet. */


/**
 * GameQuestionScreen class.
 */
class GameQuestionScreen extends React.Component {


  /**
   * Consturctor.
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
        <View style={styles.questionContainer}>
          <RNText style={styles.question}>{this.props.question}</RNText>
        </View>
        <View style={styles.answerButtonsContainer}>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[0]}
            danger={this.props.answerButtonDanger[0]}
            onPress={ () => { store.dispatch(answerButtonHighlight(0)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[0]}
            </Text>
          </Button>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[1]}
            danger={this.props.answerButtonDanger[1]}
            onPress={ () => { store.dispatch(answerButtonHighlight(1)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[1]}
            </Text>
          </Button>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[2]}
            danger={this.props.answerButtonDanger[2]}
            onPress={ () => { store.dispatch(answerButtonHighlight(2)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[2]}
            </Text>
          </Button>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[3]}
            danger={this.props.answerButtonDanger[3]}
            onPress={ () => { store.dispatch(answerButtonHighlight(3)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[3]}
            </Text>
          </Button>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[4]}
            danger={this.props.answerButtonDanger[4]}
            onPress={ () => { store.dispatch(answerButtonHighlight(4)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[4]}
            </Text>
          </Button>
          <Button
            full
            style={styles.answerButton}
            primary={this.props.answerButtonPrimary[5]}
            danger={this.props.answerButtonDanger[5]}
            onPress={ () => { store.dispatch(answerButtonHighlight(5)) } }>
            <Text style={styles.buttonText}>
              {this.props.answerButtonLabels[5]}
            </Text>
          </Button>
        </View>
        <View style={styles.submitButtonContainer}>
          <Button
            block
            success
            onPress={
              () => {
                // Make sure they selected an answer.
                if (store.getState().question.selectedAnswer === -1) {
                  // noinspection JSCheckFunctionSignatures
                  Alert.alert("D'oh!", "Please select an answer",
                    [ { text : "OK" } ], { cancelable : false }
                  );
                } else {
                  // They did, so alert the server.
                  CoreCode.io.emit("submitAnswer", {
                    playerID : store.getState().playerInfo.id,
                    answer : store.getState().question.answerButtonLabels[
                      store.getState().question.selectedAnswer
                    ]
                  });
                }
              }
            }
          >
            <Text style={styles.buttonText}>Submit Answer</Text>
          </Button>
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
    answerButtonPrimary : inState.question.answerButtonPrimary,
    answerButtonDanger : inState.question.answerButtonDanger,
    answerButtonLabels : inState.question.answerButtonLabels,
    question : inState.question.currentQuestion
  };
};


// Export components.
exports.GameQuestionScreen = connect(mapStateToProps)(GameQuestionScreen);
