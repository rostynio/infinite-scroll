import { combineReducers } from 'redux';
import beerListReducer from './store/reducers/beerListReducer';

const root = combineReducers({
  beersList: beerListReducer
});

export default root;
