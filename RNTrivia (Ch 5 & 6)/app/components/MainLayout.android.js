import React from "react";
import { StyleSheet, View } from "react-native";
import Drawer from "./MainNav";
import AdminModal from "./shared/modals/AdminModal";
import EndGameModal from "./shared/modals/EndGameModal";
import NamePromptModal from "./shared/modals/NamePromptModal";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1
  }

}); /* End stylesheet. */


// noinspection JSUnusedGlobalSymbols
/**
 * Main layout component for this platform.
 */
export default class MainLayout extends React.Component {


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
        <NamePromptModal />
        <EndGameModal />
        <AdminModal />
        <Drawer />
      </View>
    );

  } /* End render(). */


} /* End MainLayout class. */
