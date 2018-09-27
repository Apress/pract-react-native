import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CoreCode from "../../../CoreCode";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    margin : 50,
    justifyContent : "center",
    alignItems : "center"
  },

  /* Style for the screen heading text. */
  headingText : {
    fontSize : 40,
    fontWeight : "bold",
    margin : 50
  },

  /* Style for the View container around each button. */
  buttonContainer : {
    margin : 50
  },

  /* Style for the View container around the current status. */
  currentStatusContainer : {
    margin : 50
  },

  /* Style for the current status Text. */
  currentStatusText : {
    fontSize : 20,
    fontWeight : "bold",
    color : "red"
  }

}); /* End stylesheet. */


/**
 * AdminModal class.
 */
class AdminModal extends React.Component {


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
      <Modal
        presentationStyle={"fullScreen"}
        visible={this.props.isVisible}
        animationType={"slide"}
        onRequestClose={ () => { } }
      >
        <View style={styles.outerContainer}>
          <Text style={styles.headingText}>Admin</Text>
          <View style={styles.buttonContainer}>
            <Button title="New Game"
              onPress={ () => {
                CoreCode.io.emit("adminNewGame", {});
              } }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Next Question"
              onPress={ () => {
                CoreCode.io.emit("adminNextQuestion", {});
              } }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="End Game"
              onPress={ () => {
                CoreCode.io.emit("adminEndGame", {});
              } }
            />
          </View>
          <View style={styles.currentStatusContainer}>
            <Text style={styles.currentStatusText}>
              Current Status: {this.props.currentStatus}
            </Text>
          </View>
        </View>
      </Modal>
    );

  } /* End render(). */


} /* End class. */


/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
  return {
    isVisible : inState.modals.adminVisible,
    currentStatus : inState.modals.currentStatus
  };
};


// Export components.
export default connect(mapStateToProps)(AdminModal);
