import { createStore, combineReducers } from 'redux';
import loginReducer from './reducer.js'

const reduders = combineReducers({
  login : loginReducer
});

const store = createStore()