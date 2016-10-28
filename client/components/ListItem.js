import React from 'react'

class ListItem extends React.Component {
  render() {
    this.store = this.props.store
    const attrs = this.store.properties
    this.map = this.props.map
    const feature = this.map ? this.map.data.getFeatureById(attrs.id): undefined
    const point = feature ? feature.getGeometry().get(): undefined
    return (
      <div ref="container" className="item store"
           onMouseOver={() => this.mouseOver()}
           onMouseOut={() => this.mouseOut()}>
        <div className="content details">
          <a className="header" href={'#/' + attrs.name}>{attrs.name}</a>
          <div className="description">
            <i className="call icon"></i>
            <span>{attrs.formatted_phone_number || 'N/A'}</span>
          </div>
          <div className="description">
            <i className="flag icon"></i>
            <span>{attrs.formatted_address}</span>
          </div>
        </div>
        <div className="content operations">
          <div className="tiny ui basic button" onClick={() => this.showStreetView(point)}>
            <i className="red map pin icon"></i>
            Street View
          </div>
        </div>
      </div>
    )
  }
  mouseOver() {
    const { properties } = this.store
    const feature = this.map.data.getFeatureById(properties.id)
    this.map.data.overrideStyle(feature, {
      icon: {
        url: 'public/images/blue-pin.png'
      },
      zIndex: 1000
    })
  }
  mouseOut() {
    this.map.data.revertStyle()
  }
  showStreetView(pos) {
    const { panorama } = this.props
    if (!panorama) return
    panorama.setPosition(pos)
    panorama.setVisible(true)
  }
}
export default ListItem