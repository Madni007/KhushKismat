import { combineReducers } from '@reduxjs/toolkit';
import common from './slices/commonSlice';
import map from './slices/mapSlice';
import promotion from './slices/promotionSlice';
const rootReducer = combineReducers({
  common,
  map,
  promotion,

});

export default rootReducer;
