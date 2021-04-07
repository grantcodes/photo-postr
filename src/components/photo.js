import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getData } from 'exif-js'
import moment from 'moment'
import classnames from 'classnames'
import MapInput from './map-input'
import { setPhotoProperty } from '../actions'
import '../styles/photo.css'

const ConvertDMSToDD = function (degrees, minutes, seconds, direction) {
  var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60)
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1
  }
  return dd
}

const Photo = ({ actions, user, photo, file: fileProp, dragging = false }) => {
  const [uploading, setUploading] = useState(false)
  const [exif, setExif] = useState(null)
  const [file, setFile] = useState(fileProp)
  const [previewUrl, setPreviewUrl] = useState(URL.createObjectURL(fileProp))

  useEffect(() => {
    if (!exif) {
      getData(fileProp, function () {
        if (this.exifdata) {
          // Set date from exif data
          setExif(this.exifdata)
          if (this.exifdata.DateTimeOriginal) {
            actions.setPhotoProperty(
              photo.id,
              'date',
              moment(this.exifdata.DateTimeOriginal, 'YYYY:MM:DD hh:mm:ss')
            )
          } else if (this.exifdata.DateTime) {
            actions.setPhotoProperty(
              photo.id,
              'date',
              moment(this.exifdata.DateTime, 'YYYY:MM:DD hh:mm:ss')
            )
          }
          // Set GPS from exif
          if (
            this.exifdata.GPSLatitude &&
            this.exifdata.GPSLatitude.length === 3 &&
            this.exifdata.GPSLatitudeRef &&
            this.exifdata.GPSLongitude &&
            this.exifdata.GPSLongitude.length === 3 &&
            this.exifdata.GPSLongitudeRef
          ) {
            const lat = ConvertDMSToDD(
              this.exifdata.GPSLatitude[0],
              this.exifdata.GPSLatitude[1],
              this.exifdata.GPSLatitude[2],
              this.exifdata.GPSLatitudeRef
            )
            const lng = ConvertDMSToDD(
              this.exifdata.GPSLongitude[0],
              this.exifdata.GPSLongitude[1],
              this.exifdata.GPSLongitude[2],
              this.exifdata.GPSLongitudeRef
            )
            actions.setPhotoProperty(photo.id, 'latitude', lat)
            actions.setPhotoProperty(photo.id, 'longitude', lng)
          }
        }
      })
    }

    if (!photo.photoUrl && !uploading) {
      setUploading(true)
    }
  }, [])

  useEffect(() => {
    if (uploading && photo.photoUrl) {
      setUploading(false)
    }
  }, [photo])

  useEffect(() => {
    if (fileProp !== file) {
      setFile(fileProp)
      setPreviewUrl(URL.createObjectURL(fileProp))
    }
  }, [fileProp])

  const handleLocationChange = (latitude, longitude) => {
    actions.setPhotoProperty(photo.id, 'latitude', latitude)
    actions.setPhotoProperty(photo.id, 'longitude', longitude)
  }

  return (
    <div
      className={classnames('photo', {
        'photo--is-dragging': dragging,
        'photo--error': photo.error,
      })}
    >
      <div
        className={classnames('photo__preview', {
          'photo__preview--uploading': !photo.photoUrl && !photo.error,
        })}
      >
        <img
          src={previewUrl}
          alt={'preview of ' + photo.name}
          className="photo__preview__image"
        />
        {photo.photoUrl && (
          <span className="photo__preview__url">👍 {photo.photoUrl}</span>
        )}
        {photo.error && (
          <span className="photo__preview__error">👎 {photo.error}</span>
        )}
      </div>

      <div className="photo__details">
        <div>
          <label htmlFor={'photo__name' + photo.id} className="photo__label">
            Name
          </label>
          <input
            type="text"
            id={'photo__name' + photo.id}
            className="photo__input photo__name"
            value={photo.name}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              actions.setPhotoProperty(photo.id, 'name', e.target.value)
            }}
          />
        </div>

        <div>
          <label htmlFor={'photo__date' + photo.id} className="photo__label">
            Date
          </label>
          <input
            type="datetime-local"
            id={'photo__date' + photo.id}
            className="photo__input photo__date"
            value={photo.date.format('YYYY-MM-DDThh:mm:ss')}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              actions.setPhotoProperty(photo.id, 'date', moment(e.target.value))
            }}
          />
        </div>

        <div>
          <label htmlFor={'photo__content' + photo.id} className="photo__label">
            Content
          </label>
          <textarea
            id={'photo__content' + photo.id}
            className="photo__input photo__content"
            value={photo.content}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              actions.setPhotoProperty(photo.id, 'content', e.target.value)
            }}
          />
        </div>

        <div>
          <label
            htmlFor={'photo__location' + photo.id}
            className="photo__label"
          >
            Location
          </label>
          {photo.latitude !== false && photo.longitude !== false ? (
            <input
              id={'photo__location' + photo.id}
              type="text"
              readOnly={true}
              className="photo__input photo__location"
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              value={`${photo.latitude},${photo.longitude}`}
            />
          ) : null}
          <MapInput
            latitude={photo.latitude}
            longitude={photo.longitude}
            onChange={handleLocationChange}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  user: state.user.toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setPhotoProperty: setPhotoProperty,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
