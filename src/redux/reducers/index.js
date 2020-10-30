import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import movieReducer from './movieReducer';
import routesReducer from './routesReducers';

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: movieReducer,
  routes: routesReducer
});

export default rootReducers;
