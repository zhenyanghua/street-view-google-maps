import React from 'react'

class InfoWindow extends React.Component {
  render() {
    const {feature} = this.props
    const point = feature.getGeometry().get()
    const suggestions = feature.getProperty('suggestions');
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{feature.getProperty('name')}</div>
        </div>
        {
          feature.getProperty('fake') !== 2 ?
            (<div className="content">
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
            </div>) : null
        }
        {
          feature.getProperty('fake') === 2 ?
            (<div className="content">
              <div className="ui list">
                <div className="item">
                  <div className="content">
                    <div className="header">
                      There seems to be no "The Wild Rice" near <em>{feature.getProperty('formatted_address')}</em>.
                    </div>
                    <div className="description"><p><br/></p></div>
                  </div>
                </div>
                {
                  !!suggestions && suggestions.length > 0 ?
                    (<div className="item">
                      <i className="idea icon"></i>
                      <div className="content">
                        <div className="header">Are you looking for?</div>
                        <div className="list">
                          {suggestions.map((x, i) => (
                            <div className="item" key={"suggestion-" + i}>
                              <div className="description item">
                                <i className={x.icon + " icon"}></i>
                                {x.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>) : null
                }
              </div>
            </div>) : null
        }
        <div className="content">
          {
            feature.getProperty('fake') !== 2 ?
              (<a target="_blank" href={feature.getProperty('website') || '#'} className="ui button">
                <i className="external icon"></i>Website
              </a>) : null
          }
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