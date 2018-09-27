import { combineReducers, createStore } from "redux";
import initialState from "./initialState";
import {
  gameDataReducer, leaderboardReducer, modalsReducer, playerInfoReducer,
  questionReducer
} from "./reducers";


// Create a single main "root" reducer that combines all of them.  The keys in
// this object determine what chunk of the state object each reducer manages.
const rootReducer = combineReducers({
  leaderboard : leaderboardReducer,
  question : questionReducer,
  modals : modalsReducer,
  playerInfo : playerInfoReducer,
  gameData : gameDataReducer
});


// Create the store.
export default createStore(rootReducer, initialState);
