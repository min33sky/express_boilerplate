import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';

const reducer = combineReducers({
  user,
  comment,
});

export default reducer;
