import { combineReducers } from 'redux';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';

export default combineReducers({
  error: errorReducer,
  loading: loadingReducer
}); 