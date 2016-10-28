import { combineReducers } from 'redux';
import stores from './stores'
import currentListItem from './currentListItem'
import position from './position'
import selectedStore from './selectedStore'

const rootReducer = combineReducers({
  stores,
  currentListItem,
  position,
  selectedStore
})

export default rootReducer

