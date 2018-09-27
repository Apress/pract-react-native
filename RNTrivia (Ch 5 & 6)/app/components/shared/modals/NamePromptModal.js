import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Item, Input, Label, Switch, Text } from "native-base";
import { connect } from "react-redux";
import CoreCode from "../../../CoreCode";
import { setPlayerName, setIsAdmin } from "../../../state/actions";
import store from "../../../state/store";


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

  /* Style for the Input field's container View. */
  inputFieldContainer : {
    flex : 1,
    alignSelf : "stretch",
    justifyContent : "center"
  },

  /* Style for the admin Switch's container View. */
  switchContainer : {
    marginTop : 40,
    justifyContent : "center",
    flexDirection : "row"
  },

  /* Style for the Button's container View. */
  buttonContainer : {
    height : 80,
    alignSelf : "stretch",
    justifyContent : "center"
  }

}); /* End stylesheet. */


/**
 * NamePromptModal class.
 */
class NamePromptModal extends React.Component {


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
        onRequestClose={ () => { } }>
        <View style={styles.outerContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Hello, new player!</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <Item floatingLabel>
              <Label>Please enter your name</Label>
              <Input
                onChangeText={
                  (inText) => store.dispatch(setPlayerName(inText))
                }
              />
            </Item>
            <View style={ styles.switchContainer}>
              <View>
                <Switch
                  value={this.props.isAdmin}
                  onValueChange={
                    (inValue) => store.dispatch(setIsAdmin(inValue))
                  }
                />
              </View>
              <View style={{ paddingLeft : 10 }}>
                <Text>I am the admin</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button block onPress={CoreCode.startup}><Text>Ok</Text></Button>
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
    isVisible : inState.modals.namePromptVisible,
    isAdmin : inState.modals.isAdmin
  };
};


// Export components.
export default connect(mapStateToProps)(NamePromptModal);
