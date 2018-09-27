import React from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { showHideModal } from "./state/actions";
import store from "./state/store";
import MainLayout from "./components/MainLayout";


// noinspection JSUnusedGlobalSymbols
/**
 * #############################################################################
 * Main app class.
 * #############################################################################
 */
export default class App extends React.Component {


  /**
   * constructor.
   */
  constructor(inProps) {

    super(inProps);

  } /* End constructor. */


  /**
   * Component render().  Note that which version of MainLayout we render here
   * will be determined by the platform we're running on.
   *
   * The MainLayout is wrapped in Provider so that Redux state can be used
   * from any connected component in the hierarchy from MainLayout down.
   */
  render() {

    return (<Provider store={store}><Root><MainLayout/></Root></Provider>);

  } /* End render(). */


  /**
   * Component componentDidMount().
   */
  componentDidMount() {

    // Get the player's name.
    store.dispatch(showHideModal("namePrompt", true));

  }; /* End componentDidMount(). */


} /* End App class. */
