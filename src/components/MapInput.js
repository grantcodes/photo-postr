import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/map-marker.css'

const divIcon = L.divIcon({ className: 'map-marker' })

const PostLocationMarker = ({ lat, lng, onClick, onZoom }) => {
  useMapEvents({
    click: onClick,
    zoom: onZoom,
  })

  if (lat !== false && lng !== false) {
    return <Marker icon={divIcon} position={[lat, lng]} />
  }

  return null
}

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
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: '15rem', zIndex: 1 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        />
        <PostLocationMarker
          lat={lat}
          lng={lng}
          onClick={handleClick}
          onZoom={(e) => setZoom(e.target._zoom)}
        />
      </MapContainer>
      {showMarker ? (
        <button onClick={handleRemove}>Remove Location</button>
      ) : null}
    </div>
  )
}

export default MapInput
