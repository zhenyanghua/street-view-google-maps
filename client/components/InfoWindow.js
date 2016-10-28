import React from 'react'

class InfoWindow extends React.Component {
  render() {
    const {feature} = this.props
    const point = feature.getGeometry().get()
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{feature.getProperty('name')}</div>
        </div>
        <div className="content">
          <div className="description">
            <i className="flag icon"></i>
            {feature.getProperty('formatted_address')}
          </div>
          <div className="description">
            <i className="call icon"></i>
            <span>{feature.getProperty('formatted_phone_number') || 'N/A'}</span>
          </div>
          <br />
          { !!feature.getProperty('opening_hours') ?
            feature.getProperty('opening_hours').map((x, i) => (
            <div className="description" key={i}>{x}</div>
          )) : null}
        </div>
        <div className="content">
          <a target="_blank" href={feature.getProperty('website') || '#'} className="ui button">
            <i className="external icon"></i>Website
          </a>
          <button className="ui button" onClick={() => this.showStreetView(point)}>
            <i className="red map pin icon"></i>Street View
          </button>
        </div>
      </div>
    )
  }

  showStreetView(pos) {
    const { panorama } = this.props
    panorama.setPosition(pos)
    panorama.setVisible(true)
  }

}

export default InfoWindow