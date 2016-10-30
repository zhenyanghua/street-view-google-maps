import React from 'react'

class LegendItem extends React.Component {
  render() {
    return (
      <div className="tiny ui basic image label">
        <img src={this.props.image} alt={this.props.label}/> {this.props.label}
      </div>
    )
  }
}

export default LegendItem