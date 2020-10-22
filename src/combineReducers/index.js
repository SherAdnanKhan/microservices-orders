import { combineReducers } from 'redux';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import artSelectionReducer from '../reducers/artSelectionReducer';
import exibitionReducer from '../reducers/exibitionReducer';
import studioReducer from '../reducers/studioReducer';
import userReducer from '../reducers/userReducer';
import galleryReducer from '../reducers/galleryReducer';
import postReducer from '../reducers/postReducer';
import conversationReducer from '../reducers/conversationReducer';
import privacyReducer from '../reducers/privacyReducer';
import mzFlashReducer from '../reducers/mzFlashReducer';
import colorReducer from '../reducers/colorReducer';
import lobbyReducer from '../reducers/lobbyReducer';
import onlineUserReducer from '../reducers/onlineUserReducer';

export default combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  artSelections: artSelectionReducer,
  exibition: exibitionReducer,
  user: userReducer,
  onlineUser: onlineUserReducer,
  studio: studioReducer,
  gallery: galleryReducer,
  postView: postReducer,
  conversation: conversationReducer,
  privacies: privacyReducer,
  mzFlash: mzFlashReducer,
  feelColor: colorReducer,
  lobby: lobbyReducer
});
