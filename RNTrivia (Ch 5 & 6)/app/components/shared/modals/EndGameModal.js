import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    margin : 20
  },

  /* Style for the heading text's container View. */
  headingContainer : {
    height : 100,
    justifyContent : "center"
  },

  /* Style for the heading text. */
  headingText : {
    fontSize : 20,
    fontWeight : "bold"
  },

  /* Style for the message's container View. */
  messageContainer : {
    flex : 1,
    alignSelf : "center",
    justifyContent : "center"
  },

  /* Style for the Button's container View. */
  buttonContainer : {
    height : 80,
    alignSelf : "stretch",
    justifyContent : "center"
  },

  /* Style for the Button's text. */
  buttonText : {
    fontWeight : "bold",
    color : "white"
  }

}); /* End stylesheet. */


/**
 * EndGameModal class.
 */
class EndGameModal extends React.Component {


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
        presentationStyle={"formSheet"}
        visible={this.props.isVisible}
        animationType={"slide"}
        onRequestClose={ () => { } }
      >
        <View style={styles.outerContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Game over</Text>
          </View>
          <View style={styles.messageContainer}>>
            <Text>{this.props.message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button block onPress={ () => { } }>
              <Text style={ styles.buttonText }>Ok</Text>
            </Button>
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
    isVisible : inState.modals.endGameVisible,
    message : inState.modals.endGameMessage
  };
};


// Export components.
export default connect(mapStateToProps)(EndGameModal);
