import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import user from './reducers/user.reducer';

const reduxStore = createStore(
  combineReducers({ user }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default reduxStore;