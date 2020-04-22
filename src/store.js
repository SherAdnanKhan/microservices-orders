import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './combineReducers';

export default createStore(rootReducer, applyMiddleware(thunk));

