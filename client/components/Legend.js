import React from 'react'
import LegendItem from './LegendItem'
const Legend = () => (
  <div className="legend">
    <LegendItem image="public/images/store-green.png" label="Confirmed"></LegendItem>
    <LegendItem image="public/images/store-yellow.png" label="Not Found"></LegendItem>
    <LegendItem image="public/images/store-red.png" label="Suspicious"></LegendItem>
  </div>
)

export default Legend