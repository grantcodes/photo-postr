import React, { Component } from 'react'
import 'leaflet/dist/leaflet.css'
import { Map, Marker, TileLayer } from 'react-leaflet'

const initialState = {
  lat: 0,
  lng: 0,
  zoom: 0,
  marker: false,
}

class MapInput extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleClick = this.handleClick.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    if (this.props.latitude !== false && this.props.longitude !== false) {
      this.setState({
        lat: this.props.latitude,
        lng: this.props.longitude,
        zoom: 13,
        marker: true,
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.latitude !== false &&
      newProps.longitude !== false &&
      (newProps.latitude !== this.state.lat ||
        newProps.longitude !== this.state.lng)
    ) {
      this.setState({
        lat: newProps.latitude,
        lng: newProps.longitude,
        zoom: 13,
        marker: true,
      })
    }
  }

  handleClick(e) {
    this.setState({
      marker: true,
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    })
    this.props.onChange(e.latlng.lat, e.latlng.lng)
  }

  handleZoom(e) {
    this.setState({ zoom: e.target._zoom })
  }

  handleRemove() {
    this.props.onChange(false, false)
    this.setState({
      lat: 0,
      lng: 0,
      zoom: 0,
      marker: false,
    })
  }

  render() {
    return (
      <div>
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          style={{ height: '15rem' }}
          onClick={this.handleClick}
          onZoom={this.handleZoom}
        >
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.state.marker ? (
            <Marker position={[this.state.lat, this.state.lng]} />
          ) : null}
        </Map>
        {this.state.marker ? (
          <button onClick={this.handleRemove}>Remove Location</button>
        ) : null}
      </div>
    )
  }
}

export default MapInput
