import React from "react";
import {
  ActionSheetIOS, ActivityIndicator, Alert, Button, DatePickerAndroid,
  DatePickerIOS, Dimensions, FlatList, Image, Modal, NetInfo, Picker, Platform,
  ScrollView, SectionList, SegmentedControlIOS, Slider, StyleSheet,
  TimePickerAndroid, ToastAndroid, TouchableHighlight, Switch, Text, TextInput,
  View, WebView, Vibration, ViewPagerAndroid
} from "react-native";


// Test Geolocation API.
navigator.geolocation.getCurrentPosition(
  (position) => { console.log("getCurrentPosition()", position); },
  (error) => { console.log("getCurrentPosition() error", error); },
  { enableHighAccuracy : true, timeout : 20000, maximumAge : 1000 }
);


// Test NetInfo API.
NetInfo.getConnectionInfo().then((inConnectionInfo) => {
  console.log("getConnectionInfo()", inConnectionInfo);
});
NetInfo.isConnected.fetch().then(isConnected => {
  console.log(`We are currently ${isConnected ? "Online" : "Offline"}`);
});
NetInfo.isConnectionExpensive().then(isConnectionExpensive => {
  console.log(
    `Connection is ${(isConnectionExpensive ? "Metered" : "Not Metered")}`
  );
})
.catch(error => {
  console.log("isConnectionExpensive() not supported on iOS");
});


// Test StyleSheet API.
const stylesAPITest = StyleSheet.create({
  style1 : { flex : 1, fontSize : 12, color : "red" },
  style2 : { color : "blue" },
});
const stylesAPITestNew =
  StyleSheet.flatten([stylesAPITest.style1, stylesAPITest.style2]);
console.log("stylesAPITestNew", stylesAPITestNew);


// Test Platform API.
console.log(`OS=${Platform.OS}, Version=${Platform.Version}`);


// Test Vibration API.
Vibration.vibrate([ 250, 2000, 250, 1500, 250, 1000, 250, 500 ]);


/**
 * Styles.
 */
const styles = StyleSheet.create({
  header : {
    paddingBottom : 10,
    fontSize : 20,
    textDecorationLine : "underline",
    color : "#ff0000"
  },
  scrollViewContainer : {
    flex : 1,
    backgroundColor : "#ffff00",
    marginTop : 50
  },
  viewContainer : {
    flex : 1,
    backgroundColor : "#ffffff",
    alignItems : "center"
  },
  divider : {
    width : "90%",
    marginTop : 20,
    marginBottom : 20,
    borderBottomColor : "black",
    borderBottomWidth : 1
  }
});


/**
 * Data for the SectionList.
 */
const sciFiCharacters = [
  { title : "Babylon 5",
    data : [
      "John Sheridan", "Michael Garibaldi", "Stephen Franklin",
      "Jeffrey Sinclair"
    ]
  },
  { title : "Star Trek",
    data : [ "James Kirk", "Leonard McCoy", "Hikaru Sulu", "Pavel Chekov" ]
  },
  { title : "Star Wars", data : [ "Han Solo", "Luke Skywalker", "Leia Organa" ]
  },
  { title : "Battlestar Galactica",
    data : [ "Kara Thrace", "Gaius Baltar", "William Adama", "Laura Roslin" ]
  }
];


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputValue : "I am a TextInput", bestCaptain : "john_sheridan",
      meaningOfLife : 42, loveRN : true, modalVisible : false,
      chosenDate : new Date(), segmentedIndex : 1, selectedTab:"welcome"
    };

  }


  render() { return (
    <ScrollView style={ styles.scrollViewContainer } >

      <View style={ styles.viewContainer } >

        <Text style={{ fontSize : 32, fontWeight : "bold", color : "blue" }}>
          Welcome to Components!
        </Text>
        <View style={ styles.divider } />

        <Text style={ styles.header }>Image</Text>
        <Image source={ require("./image.png") } />
        <View style={ styles.divider } />

        <Text style={ styles.header }>TextInput</Text>
        <TextInput value={ this.state.textInputValue }
          style={{ width : "50%", height : 40,
            borderColor : "green", borderWidth : 2
          }}
          onChangeText={ (inText) => this.setState({inText}) }
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>Picker</Text>
        <Picker selectedValue={ this.state.bestCaptain }
          style={{ width: 100, height : 200 }}
          onValueChange={
            (inValue, inIndex) => this.setState({ bestCaptain : inValue })
          }
        >
          <Picker.Item label="James Kirk" value="james_kirk" />
          <Picker.Item label="John Sheridan" value="john_sheridan" />
          <Picker.Item label="Han Solo" value="han_solo" />
          <Picker.Item label="Ahab" value="ahab" />
        </Picker>
        <View style={ styles.divider } />

        <Text style={ styles.header }>Slider</Text>
        <Slider style={{ width : "75%" }} step={ 1 } minimumValue={ 0 }
         maximumValue={ 84 } value={ this.state.meaningOfLife }
         onValueChange={ inValue => this.setState({ meaningOfLife : inValue })}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>Switch</Text>
        <Switch value={ this.state.loveRN }
          onValueChange={ (inValue) => this.setState({ loveRN : inValue }) }
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>Button</Text>
        <Button title="Go ahead, press me, I dare ya!"
          onPress={ () =>
            Alert.alert("Greetings, human!",
              "You know just how to push my buttons!",
              [ { text : "OK" } ], { cancelable : false }
            )
          }
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>FlatList</Text>
        <FlatList style={{ height : 80 }}
          data={[
            { key : "1", text : "Dream Theater" },
            { key : "2", text : "Enchant" },
            { key : "3", text : "Fates Warning" },
            { key : "4", text : "Kamelot" },
            { key : "5", text : "Pyramaze" },
            { key : "6", text : "Rush" },
            { key : "7", text : "Serenity" },
            { key : "8", text : "Shadow Gallery" },
            { key : "9", text : "Pink Floyd" },
            { key : "10", text : "Queensryche" }
          ]}
          renderItem={ ({item}) => <Text>{ item.text }</Text> }
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>SectionList</Text>
        <SectionList style={{ height : 100, borderWidth : 1, padding: 20 }}
          renderItem={ ({item, index, section}) => <Text key={index}>{item}</Text> }
          renderSectionHeader={ ({ section : { title}  }) => (
            <Text style={{
              backgroundColor:"#e0e0e0",fontWeight : "bold"
            }}>{title}</Text>
          )}
          sections={ sciFiCharacters}
          keyExtractor={ (inItem, inIndex) => inItem + inIndex }
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>ActivityIndicator</Text>
        <View>
          <ActivityIndicator size="large" color="#ff0000" style={{ padding : 10 }} />
          <ActivityIndicator size="small" color="#00ff00" style={{ padding : 10 }} />
          <ActivityIndicator size="large" color="#0000ff" style={{ padding : 10 }} />
          <ActivityIndicator size="small" color="#a0a0a0" style={{ padding : 10 }} />
        </View>
        <View style={ styles.divider } />

        <Text style={ styles.header }>Modal</Text>
        <Modal animationType="slide" transparent={ false }
          visible={this.state.modalVisible} presentationStyle="formSheet"
          onRequestClose={ () => { console.log("onRequestClose"); } }
        >
          <View style={{ marginTop : 100, flex : 1, alignItems : "center" }}>
            <View style={{ flex : 1, alignItems : "center" }}>
              <Text>
                I am a modal. Ain't I cool??
              </Text>
              <TouchableHighlight style={{ marginTop : 100 }}
                onPress={ () => { this.setState({ modalVisible : false }); } }
              >
                <Text>Tap me to hide modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight style={{ marginTop : 20 }}
          onPress={() => { this.setState({modalVisible : true}); }}
        >
          <Text>Tap me to show modal</Text>
        </TouchableHighlight>
        <View style={ styles.divider } />

        <Text style={ styles.header }>WebView</Text>
        <WebView style={{ width : 400, height : 400 }}
          source={{ uri : "https://facebook.github.io/react-native" }}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>DatePicker</Text>
        <DatePickerIOS
          style={{ width : 400, height : 200 }}
          date={ this.state.chosenDate }
          onDateChange={ (inDate) => this.setState({ chosenDate : inDate }) }
        />
        <Button title="Open DatePickerAndroid"
          onPress={ async () => {
            const { action, year, month, day } = await DatePickerAndroid.open({
              date : new Date()
            });
            if (action === DatePickerAndroid.dateSetAction) {
              console.log(year + " " + month + " " + day);
            }
            if (action === DatePickerAndroid.dismissedAction) {
              console.log("Dismissed");
            }
          }}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>ActionSheetIOS</Text>
        <Button title="Open ActionSheetIOS"
          onPress={ () => {
            ActionSheetIOS.showActionSheetWithOptions(
              { title : "My Favorite Muppet", message : "Pick one, human!",
                options: [ "Fozzy", "Gonzo", "Kermit", "Piggie" ]
              },
              (buttonIndex) => { console.log(buttonIndex); }
            );
          }}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>SegmentedControlIOS</Text>
        <SegmentedControlIOS style={{ width : 400 }} tintColor="#00ffff"
          values={ [ "Venus", "Earth", "Mars" ] }
          selectedIndex={ this.state.segmentedIndex }
          onChange={ (inEvent) => {
            this.setState({
              segmentedIndex : inEvent.nativeEvent.selectedSegmentIndex
            });
          }}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>TimePickerAndroid</Text>
        <Button title="Open TimePickerAndroid"
          onPress={ async () => {
            const { action, hour, minute } = await TimePickerAndroid.open({
              hour : 16, minute : 30, is24Hour : false
            });
            if (action === TimePickerAndroid.timeSetAction) {
              console.log(hour + ":" + minute);
            }
            if (action === TimePickerAndroid.dismissedAction) {
              console.log("Dismissed");
            }
          }}
        />
        <View style={ styles.divider } />

        <Text style={ styles.header }>ViewPagerAndroid</Text>
        <ViewPagerAndroid initialPage={ 0 }
          style={{ flex : 1, width : "100%", height : 100 }}
        >
          <View style={{ alignItems : "center", padding : 10 }}>
            <Text style={{ fontSize : 24 }}>Page{"\n"}Number{"\n"}1</Text>
          </View>
          <View style={{ alignItems : 'center', padding : 10 }}>
            <Text style={{ fontSize : 24 }}>Page{"\n"}Number{"\n"}2</Text>
          </View>
        </ViewPagerAndroid>
        <View style={ styles.divider } />

        <Text style={ styles.header }>ToastAndroid</Text>
        <Button title="Show Toast Message (Android Only)"
          onPress={ async () => {
            ToastAndroid.show("I am a short message", ToastAndroid.SHORT);
            ToastAndroid.showWithGravity(
              "I am a message with gravity, centered",
              ToastAndroid.SHORT, ToastAndroid.CENTER
            );
            ToastAndroid.showWithGravityAndOffset(
              "I am a message with gravity, offset from the bottom",
              ToastAndroid.LONG, ToastAndroid.TOP,
              -75, Dimensions.get("window").height / 2
            );
          }}
        />
        <View style={ styles.divider } />

      </View>

    </ScrollView>

  ); } /* End render(). */

} /* End App component. */
