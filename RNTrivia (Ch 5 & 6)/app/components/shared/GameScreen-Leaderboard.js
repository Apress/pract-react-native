import React from "react";
import { FlatList, WebView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import store from "../../state/store";


/**
 * Styles for this component.
 *
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "stretch",
    justifyContent : "center",
    marginTop : 50
  },

  /* Style for the screen heading container. */
  headingContainer : {
    height : 150,
    justifyContent : "center",
    alignSelf : "center"
  },

  /* Style for the screen heading text. */
  headingText : {
    fontSize : 34,
    fontWeight : "bold"
  },

  /* Style for the list. */
  listContainer : {
    flex : .6,
    marginLeft : 20,
    marginRight : 20,
    marginBottom : 40,
    borderColor : "silver",
    borderWidth : 2,
    padding : 10
  },

  /* Style for the AwaitingQuestion container. */
  awaitingQuestionContainer : {
    flex : .4
  },

  /* Style for the awaiting question text WebView (show just content). */
  awaitingQuestionWebView : {
    backgroundColor : "transparent"
  }

}); /* End stylesheet. */


/**
 * Styles for the spinning Awaiting Question text.
 */
const awaitingQuestionSpinStyles = `
.spinText {
  animation-name : spin, depth;
  animation-timing-function : linear;
  animation-iteration-count : infinite;
  animation-duration : 3s;
  text-align : center;
  font-weight : bold;
  color : red;
  font-size : 24pt;
  padding-top : 100px;
}
@keyframes spin {
  from { transform : rotateY(0deg); }
  to { transform : rotateY(-360deg); }
}
@keyframes depth {
  0 { text-shadow : 0 0 black; }
  25% { text-shadow : 1px 0 black, 2px 0 black, 3px 0 black, 4px 0 black, 5px 0 black; }
  50% { text-shadow : 0 0 black; }
  75% { text-shadow : -1px 0 black, -2px 0 black, -3px 0 black, -4px 0 black, -5px 0 black; }
  100% { text-shadow : 0 0 black; }
}
`;

/**
 * HTML content for the WebView for the spinning Awaiting Question text.
 */
const awaitingQuestionHTML = `
<style>${awaitingQuestionSpinStyles}</style>
<div class="spinText">Awaiting Question</div>
`;


/**
 * GameLeaderboardScreen class.
 */
class GameLeaderboardScreen extends React.Component {


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
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Current Leaderboard</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.props.listData}
            keyExtractor={ (inItem) => inItem.playerID }
            renderItem={ ({item}) => {
              return (
                <View style={{ flex : 1, flexDirection : "row" }}>
                  <View style={{ flex : .6 }}>
                    <Text style={{ fontSize : 20 }}>{item.playerName}
                    {store.getState().playerInfo.id === item.playerID ? " (YOU)" : ""}</Text>
                  </View>
                  <View style={{ flex : .4 }}>
                    <Text style={{ fontSize : 20 }}>{item.points} points</Text>
                  </View>
                </View>
              );
            } }
          />
        </View>
        <View style={styles.awaitingQuestionContainer}>
          <WebView
            style={styles.awaitingQuestionWebView}
            source={{ html : awaitingQuestionHTML }}
          />
        </View>
      </View>
    );

  } /* End render(). */


} /* End class. */


/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
console.log("inState", inState);
  return { listData : inState.leaderboard.listData };
};


// Export components.
exports.GameLeaderboardScreen = connect(mapStateToProps)(GameLeaderboardScreen);
