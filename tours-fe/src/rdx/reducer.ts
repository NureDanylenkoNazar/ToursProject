import { combineReducers } from 'redux';
import { sessionReducer } from './session';

export const reducer = combineReducers<{ session: typeof sessionReducer }>({
  session: sessionReducer,
});
