import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Main from './Main'

const mapStateToProps = state =>
  ({
    extent: state.extent,
    stores: state.stores,
    currentListItem: state.currentListItem,
    position: state.position
  })

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App