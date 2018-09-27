import React from "react";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker, Platform, ScrollView,
  StyleSheet, Text, View
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Root, Toast } from "native-base";
import { Constants } from "expo";


/**
 * #############################################################################
 * Styles.
 * #############################################################################
 */
const styles = StyleSheet.create({

  listScreenContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    /* Branch on platform type for different styling. */
    ...Platform.select({
      ios : {
        paddingTop : Constants.statusBarHeight
      },
      android : { }
    })
  },

  personList : {
    width : "94%"
  },

  personContainer : {
    flexDirection : "row",
    marginTop : 4,
    marginBottom : 4,
    borderColor : "#e0e0e0",
    borderBottomWidth : 2,
    alignItems : "center"
  },

  personName : {
    flex : 1
  },

  addScreenContainer : {
    marginTop : Constants.statusBarHeight
  },

  addScreenInnerContainer : {
    flex : 1,
    alignItems : "center",
    paddingTop : 20,
    width : "100%"
  },

  addScreenFormContainer : {
    width : "96%"
  },

  fieldLabel : {
    marginLeft : 10
  },

  pickerContainer : {
    ...Platform.select({
      ios : { },
      android : {
        borderRadius : 8,
        borderColor : "#c0c0c0",
        borderWidth : 2,
        width : "96%",
        marginLeft : 10,
        marginBottom : 20,
        marginTop : 4
      }
    })
  },

  picker : {
    ...Platform.select({
      ios : {
        width : "96%",
        borderRadius : 8,
        borderColor : "#c0c0c0",
        borderWidth : 2,
        marginLeft : 10,
        marginBottom : 20,
        marginTop : 4
      },
      android : { }
    })
  },

  addScreenButtonsContainer : {
    flexDirection : "row",
    justifyContent : "center"
  }

});


/**
 * #############################################################################
 * List screen.
 * #############################################################################
 */
class ListScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);

    this.state = {
      listData : [ ]
    };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { return (

    <Root>
      <View style={styles.listScreenContainer}>
        { /* ########## Add Person button ########## */ }
        <CustomButton
          text="Add Person"
          width="94%"
          onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
        />
        { /* ########## Person list ########## */ }
        <FlatList
          style={styles.personList}
          data={this.state.listData}
          renderItem={ ({item}) =>
            <View style={styles.personContainer}>
              <Text style={styles.personName}>
                {item.firstName} {item.lastName} ({item.relationship})
              </Text>
              <CustomButton
                text="Delete"
                onPress={ () => {
                  Alert.alert("Please confirm",
                    "Are you sure you want to delete this person?",
                    [
                      { text : "Yes",
                        onPress : () => {
                          // Pull data out of storage.
                          AsyncStorage.getItem("people",
                            function(inError, inPeople) {
                              if (inPeople === null) {
                                inPeople = [ ];
                              } else {
                                inPeople = JSON.parse(inPeople);
                              }
                              // Find the right one to delete and splice it out.
                              for (let i = 0; i < inPeople.length; i++) {
                                const person = inPeople[i];
                                if (person.key === item.key) {
                                  inPeople.splice(i, 1);
                                  break;
                                }
                              }
                              // Store updated data in storage.
                              AsyncStorage.setItem("people",
                                JSON.stringify(inPeople), function() {
                                  // Set new state to update list.
                                  this.setState({ listData : inPeople });
                                  // Show toast message to confirm deletion.
                                  Toast.show({
                                    text : "Person deleted",
                                    position : "bottom",
                                    type : "danger",
                                    duration : 2000
                                  });
                                }.bind(this)
                              );
                            }.bind(this)
                          );
                        }
                      },
                      { text : "No" },
                      { text : "Cancel", style : "cancel" }
                    ],
                    { cancelable : true }
                  )
                } }
              />
            </View>
          }
        />
      </View>
    </Root>

  ); } /* End render(). */


  /**
   * Execute after the component mounts.
   */
  componentDidMount() {

    // Block hardware back button on Android.
    BackHandler.addEventListener(
      "hardwareBackPress", () => { return true; }
    );

    // Get list of people.
    AsyncStorage.getItem("people",
      function(inError, inPeople) {
        if (inPeople === null) {
          inPeople = [ ];
        } else {
          inPeople = JSON.parse(inPeople);
        }
        this.setState({ listData : inPeople });
      }.bind(this)
    );

  }; /* End componentDidMount() */


} /* End ListScreen. */


/**
 * #############################################################################
 * Add screen.
 * #############################################################################
 */
class AddScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);

    this.state = {
      firstName : "",
      lastName : "",
      relationship : "",
      key : `p_${new Date().getTime()}`
    };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { return (

    <Root>
      <ScrollView style={styles.addScreenContainer}>
        <View style={styles.addScreenInnerContainer}>
          <View style={styles.addScreenFormContainer}>
            { /* ########## First Name ########## */ }
            <CustomTextInput
              label="First Name"
              maxLength={20}
              stateHolder={this}
              stateFieldName="firstName"
            />
            { /* ########## Last Name ########## */ }
            <CustomTextInput
              label="Last Name"
              maxLength={20}
              stateHolder={this}
              stateFieldName="lastName"
            />
            { /* ########## Relationship ########## */ }
            <Text style={styles.fieldLabel}>Relationship</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                prompt="Relationship"
                selectedValue={this.state.relationship}
                onValueChange={
                  (inItemValue) => this.setState({ relationship : inItemValue })
                }
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Me" value="Me" />
                <Picker.Item label="Family" value="Family" />
                <Picker.Item label="Friend" value="Friend" />
                <Picker.Item label="Coworker" value="Coworker" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
          { /* ########## Buttons ########## */ }
          <View style={styles.addScreenButtonsContainer}>
            <CustomButton
              text="Cancel"
              width="44%"
              onPress={
                () => { this.props.navigation.navigate("ListScreen"); }
              }
            />
            <CustomButton
              text="Save"
              width="44%"
              onPress={ () => {
                AsyncStorage.getItem("people",
                  function(inError, inPeople) {
                    if (inPeople === null) {
                      inPeople = [ ];
                    } else {
                      inPeople = JSON.parse(inPeople);
                    }
                    inPeople.push(this.state);
                    AsyncStorage.setItem("people",
                      JSON.stringify(inPeople), function() {
                        this.props.navigation.navigate("ListScreen");
                      }.bind(this)
                    );
                  }.bind(this)
                );
              } }
            />
          </View>
        </View>
      </ScrollView>
    </Root>

  ); } /* End render(). */


} /* End AddScreen. */


/**
 * #############################################################################
 * Define the screen itself.
 * #############################################################################
 */
const PeopleScreen = StackNavigator(

  /* ----------  Routes. ----------  */
  {
    ListScreen : { screen : ListScreen },
    AddScreen : { screen : AddScreen }
  }, /* End routes. */

  /* ----------  Options. ----------  */
  {
    headerMode : "none",
    initialRouteName : "ListScreen"
  } /* End options. */

); /* End StackNavigator definition. */


// Export the component.
exports.PeopleScreen = PeopleScreen;
