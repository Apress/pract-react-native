import React from "react";
import { Button, Image, Platform, Slider, Text, View } from "react-native";
import state from "./state";
import { Constants } from "expo";

// Now, import modules that need to be in global scope and need to be bound
// to the component later in the constructor.
// noinspection JSUndefinedPropertyAssignment
global.alterMatrixSize = require("./functions/alterMatrixSize");
// noinspection JSUndefinedPropertyAssignment
global.buildMatrix = require("./functions/buildMatrix");
// noinspection JSUndefinedPropertyAssignment
global.determineOutcome = require("./functions/determineOutcome");
// noinspection JSUndefinedPropertyAssignment
global.generateSolvableLayout = require("./functions/generateSolvableLayout");
// noinspection JSUndefinedPropertyAssignment
global.tilePress = require("./functions/tilePress");


// noinspection JSUnusedGlobalSymbols
/**
 * Our top-level component.
 */
export default class App extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);

    // Set initial state.
    this.state = state;

    // Bind global-scope functions to this component.
    // noinspection JSUndefinedPropertyAssignment, JSUnresolvedVariable
    global.alterMatrixSize = global.alterMatrixSize.bind(this);
    // noinspection JSUndefinedPropertyAssignment, JSUnresolvedVariable
    global.buildMatrix = global.buildMatrix.bind(this);
    // noinspection JSUndefinedPropertyAssignment, JSUnresolvedVariable
    global.determineOutcome = global.determineOutcome.bind(this);
    // noinspection JSUndefinedPropertyAssignment, JSUnresolvedVariable
    global.generateSolvableLayout = global.generateSolvableLayout.bind(this);
    // noinspection JSUndefinedPropertyAssignment, JSUnresolvedVariable
    global.tilePress = global.tilePress.bind(this);

  } /* End constructor. */


  /**
   * Handle render event.
   */
  render() {

    // Conditionally render the control menu (changes to controlMenuVisible in
    // state triggers re-render remember, that's how this works).
    let controlMenu = null;
    if (this.state.controlMenuVisible) {
      // noinspection JSUnresolvedFunction
      controlMenu = (
        <View style={{
          padding : 20,
          position : "absolute",
          zIndex : 9999,
          flex : 1,
          alignItems : "stretch",
          justifyContent : "center",
          backgroundColor : "rgba(100, 64, 255, 0.95)",
          borderRadius : 20,
          width : this.state.controlMenuWidth,
          height : this.state.controlMenuHeight,
          left :
            (this.state.screenUsableWidth - this.state.controlMenuWidth) / 2,
          top :
            (this.state.screenUsableHeight - this.state.controlMenuHeight) / 2
        }}>
          <View style={{ alignSelf : "center", paddingBottom : 40}}>
            <Text style={{
              color : "#ffffff", fontSize : 24, fontWeight : "bold"
            }}>
              Control Menu
            </Text>
          </View>
          <View style={{ paddingBottom : 40, alignSelf : "center" }}>
            <Button title="Start A New Game" style={{ width : 150 }}
              onPress={ () => {
                state.numberOfTilesAcross = this.state.numberOfTilesAcross;
                state.numberOfTilesDown = this.state.numberOfTilesDown;
                this.setState(state, buildMatrix);
              }}
            />
          </View>
          <Text style={{ color : "#ffffff" }}>Tiles Across</Text>
          <Slider minimumValue={3} maximumValue={6} value={3} step={1}
            maximumTrackTintColor="white"
            onSlidingComplete={
              (inValue) => global.alterMatrixSize("across", inValue)
            }
          />
          <Text style={{ color : "#ffffff", paddingTop : 40 }}>
            Tiles Down
          </Text>
          <Slider minimumValue={3} maximumValue={6} value={3} step={1}
            maximumTrackTintColor="white"
            onSlidingComplete={
              (inValue) => global.alterMatrixSize("down", inValue)
            }
          />
          <View style={{ paddingTop : 40 }}>
            <Text style={{ color : "#ffffff" }}>
              Warning: changing the grid size will automatically begin
              a new game!
            </Text>
          </View>
          <View style={{ paddingTop : 40, alignSelf : "center" }}>
            <Button title="Done" style={{ width : 150 }}
              onPress={ () => this.setState({
                controlMenuVisible : false, controlMenuButtonDisabled : false
              }) }
            />
          </View>
        </View>
      );
    }

    // Conditionally render the you won screen (changes to wonVisible in
    // state triggers re-render remember, that's how this works).
    let wonScreen = null;
    if (this.state.wonVisible) {
      const elapsedTime = Math.round(
        (new Date().getTime() - this.state.startTime) / 1000
      );
      wonScreen = (
        <View style={{
          zIndex : 9998,
          position : "absolute",
          left : 0,
          top : this.state.controlAreaHeight,
          width : this.state.screenUsableWidth,
          height : this.state.screenUsableHeight
        }}>
          <Image source={require("./images/won.png")}
            resizeMode="stretch" fadeDuration={0}
            style={{
              width : this.state.screenUsableWidth,
              height : this.state.screenUsableHeight
            }}
          />
          <View style={{
            alignItems : "center",
            justifyContent : "center",
            position : "absolute",
            width : "100%",
            left : 0,
            zIndex : 9999,
            top : this.state.screenUsableHeight - 240
          }}>
            <Text style={{ fontSize : 20, fontWeight : "bold" }}>
              You took {this.state.moveCount} moves to win
            </Text>
            <Text style={{
              fontSize : 20, fontWeight : "bold", paddingBottom : 40
            }}>
              Game lasted {elapsedTime} seconds
            </Text>
            <Button title="Start A New Game"
              onPress={ () => {
                state.numberOfTilesAcross = this.state.numberOfTilesAcross;
                state.numberOfTilesDown = this.state.numberOfTilesDown;
                this.setState(state, buildMatrix);
              }}
            />
          </View>
        </View>
      );
    }

    // Return our final component markup.
    return (
      <View style={{
        flex : 1,
        alignItems : "stretch",
        backgroundColor : "#000000"
      }}>
        <View style={{
          position : "absolute",
          left : 0,
          width : "100%",
          top : Platform.OS.toLowerCase() === "android" ?
            Constants.statusBarHeight + 10 : 0
        }}>
          <Button title="Control Menu"
            disabled={this.state.controlMenuButtonDisabled}
            onPress={ () => { this.setState({
              controlMenuButtonDisabled : true, controlMenuVisible : true
            }) }}
          />
        </View>
        {wonScreen}
        {controlMenu}
        {this.state.tiles}
      </View>
    )

  } /* End render(). */


  /**
   * Handle componentDidMount event.
   */
  componentDidMount() {

    this.setState(state, buildMatrix);

  } /* End componentDidMount(). */


} /* End App. */
