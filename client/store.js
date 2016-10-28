import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer'
import stores from './data/stores'

const defaultState = {
  stores,
  currentListItem: {},
  position: '',
  selectedStore: {}
}
const store = createStore(rootReducer, defaultState)

export default store