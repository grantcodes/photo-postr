import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import { Map, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/map-marker.css'

const divIcon = L.divIcon({ className: 'map-marker' })

const MapInput = ({ latitude = false, longitude = false, onChange }) => {
  const [{ lat, lng }, setGeo] = useState({ lat: latitude, lng: longitude })
  const [zoom, setZoom] = useState(1)

  const showMarker = lat !== false && lng !== false

  useEffect(() => {
    if (latitude !== false && longitude !== false) {
      if (zoom < 13) {
        setZoom(13)
      }
      setGeo({ lat: latitude, lng: longitude })
    }
  }, [latitude, longitude])

  const handleClick = (e) => {
    setGeo(e.latlng)
    onChange(e.latlng.lat, e.latlng.lng)
  }

  const handleRemove = (e) => {
    onChange(false, false)
    setGeo({ lat: false, lng: false })
    setZoom(1)
  }

  return (
    <div>
      <Map
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: '15rem', zIndex: 1 }}
        onClick={handleClick}
        onZoom={(e) => setZoom(e.target._zoom)}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
          attribution={`Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`}
        />
        {showMarker ? <Marker icon={divIcon} position={[lat, lng]} /> : null}
      </Map>
      {showMarker ? (
        <button onClick={handleRemove}>Remove Location</button>
      ) : null}
    </div>
  )
}

export default MapInput
