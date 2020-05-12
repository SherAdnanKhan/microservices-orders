import { combineReducers } from 'redux';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import artSelectionReducer from "../reducers/artSelectionReducer";
import lobbyReducer from '../reducers/lobbyReducer';

export default combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  artSelections: artSelectionReducer,
  lobby: lobbyReducer
}); 