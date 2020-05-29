import { combineReducers } from 'redux';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import artSelectionReducer from "../reducers/artSelectionReducer";
import exibitionReducer from "../reducers/exibitionReducer";
import studioReducer from '../reducers/studioReducer';
import userReducer from '../reducers/userReducer';
import galleryReducer from "../reducers/galleryReducer";
import postReducer from "../reducers/postReducer";
import conversationReducer from '../reducers/conversationReducer';

export default combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  artSelections: artSelectionReducer,
  exibition: exibitionReducer,
  user: userReducer,
  studio: studioReducer,
  gallery: galleryReducer,
  postView: postReducer,
  conversation: conversationReducer
}); 