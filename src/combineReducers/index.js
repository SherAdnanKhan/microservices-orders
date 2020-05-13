import { combineReducers } from 'redux';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import artSelectionReducer from "../reducers/artSelectionReducer";
import exibitionReducer from "../reducers/exibitionReducer";
import lobbyReducer from '../reducers/lobbyReducer';
import studioReducer from '../reducers/studioReducer';

export default combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  artSelections: artSelectionReducer,
  exibition: exibitionReducer,
  lobby: lobbyReducer,
  studio: studioReducer
}); 