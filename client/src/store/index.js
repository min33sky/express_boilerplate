import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducer from '../reducers';

const initialState = {};

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(promiseMiddleware, ReduxThunk))
    : composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk));

const store = createStore(reducer, initialState, enhancer);

export default store;
