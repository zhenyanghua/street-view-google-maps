import React from 'react'
import ListItem from './ListItem'

class List extends React.Component {
  render() {
    const { stores } = this.props
    return (
      <div className="ui big celled list">
        { stores.features.map((store, i) =>
          <ListItem store={store}
                    key={i}
                    {...this.props}
          />) }
      </div>
    )
  }
}

export default List