import React from 'react'
import ReactDOM from 'react-dom'
import loadGoogleMapsAPI from 'load-google-maps-api'
import 'semantic-ui-css/semantic.css'
import jQuery from 'jquery'
window.jQuery = jQuery
require('semantic-ui-css/semantic')
import List from './List'
import InfoWindow from './InfoWindow'
import stores from '../data/stores'

class Main extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="ui top attached menu">
          <div className="item">
            <a href="/">
              <img className="ui mini image" src="public/images/store.png"/>
            </a>
          </div>
          <div className="ui item">
            <div className="ui red header">
              Places and Street View
            </div>
          </div>
        </div>
        <div className="ui bottom attached segment">
          <div className="ui stackable grid">
            <div className="row">
              <div ref="infoPanel" className="left five wide column">
                <List {...this.props}
                      map={this.map}
                      panorama={this.map ? this.map.getStreetView() : null}
                      openStreetView={() => this.openStreetView()} />
              </div>
              <div className="right eleven wide column">
                <div ref="map" className="map-canvas">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    loadGoogleMapsAPI({
      key: 'AIzaSyA7U_W-DipuiGaONpCHJiCxTF9-plPU4o4',
      v: '3',
      libraries: ['places', 'geometry']
    }).then(gmaps => {
      this.map = new gmaps.Map(ReactDOM.findDOMNode(this.refs.map), {
        center: new gmaps.LatLng(39.8721117, -74.9794475),
        zoom: 12,
        styles: this.setMapStyle()
      })
      // this.locateMe()
      this.loadData()
      this.bounds = new gmaps.LatLngBounds(
        new gmaps.LatLng(39.002693, -84.799927),
        new gmaps.LatLng(39.430408, -84.102295)
      )

      gmaps.event.addListener(this.map, 'bounds_changed', () => this.updateListFromExtent())
    })
  }

  setMapStyle() {
    return [
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road.local",
        "stylers": [
          { "visibility": "simplified" }
        ]
      }
    ]
  }

  loadData() {
    this.map.data.addGeoJson(this.props.stores, {idPropertyName: 'id'})
    this.map.data.setStyle({
      icon: {
        url: 'public/images/store.png',
        anchor: new google.maps.Point(16, 0),
        scaledSize: new google.maps.Size(26, 26)
      }
    })
    this.addPopup()
  }

  updateListFromExtent() {
    const extent = this.map.getBounds()
    const storeList = stores.features.filter(feature => {
      const coords = feature.geometry.coordinates
      return extent.contains(new google.maps.LatLng(coords[1], coords[0]))
    })
    this.props.updateListFromExtent(storeList)
  }

  listNearBy(point) {
    const origin = point
    const distanceIndex = stores.features.map((feature, i) => {
      const coords = feature.geometry.coordinates
      const destination = new google.maps.LatLng(coords[1], coords[0])
      const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination)
      return {
        distance: distance,
        index: i
      }
    })
    const sortedDistanceIndex = distanceIndex.sort((a, b) => {
      return a.distance - b.distance
    })
    const bounds = new google.maps.LatLngBounds()
    sortedDistanceIndex.slice(0, 2)
      .forEach(x => {
        let coords = stores.features[x.index].geometry.coordinates
        bounds.extend(new google.maps.LatLng(coords[1], coords[0]))
      })
    bounds.extend(point)
    this.map.fitBounds(bounds)
  }

  dropPin(point) {
    if (this.pin) {
      this.pin.setMap(null)
    }
    this.pin = new google.maps.Marker({
      animation: 'DROP',
      position: point,
      map: this.map
    });
  }

  addPopup() {
    this.infoWindow = new google.maps.InfoWindow()
    this.map.data.addListener('click', (event) => {
      const {feature} = event
      const point = feature.getGeometry().get()
      const content = document.createElement('div')
      ReactDOM.render(
        <InfoWindow key={feature.getProperty('id')}
                    feature={feature}
                    panorama={this.map.getStreetView()}
                    {...this.props} />, content
      )
      this.infoWindow.setContent(content)
      this.infoWindow.setPosition(point)
      this.infoWindow.open(this.map)
    })
  }

  componentDidUpdate() {
    if (this.props.currentListItem.properties) {
      const $container =jQuery(ReactDOM.findDOMNode(this.refs.infoPanel))
      $container.animate({
        scrollTop: 0
      }, 200)
    }
  }
}

export default Main