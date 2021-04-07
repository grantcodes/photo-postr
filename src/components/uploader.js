import React, { Fragment, useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UploadField } from '@navjobs/upload'
import {
  addPhoto,
  setPhotoUploading,
  setPhotoUploaded,
  setPhotoProperty,
  setPhotoUploadError,
} from '../actions'
import moment from 'moment'
import { generate as generateId } from 'shortid'
import classnames from 'classnames'
import { postMedia } from '../modules/rest-api'
import '../styles/uploader.css'

const Uploader = ({ user, uploading, photos, actions }) => {
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    // Add listener for drag events and make the drop zone cover the whole screen
    window.addEventListener('dragenter', (e) => setFullscreen(true))
    window.addEventListener('dragend', (e) => setFullscreen(false))
  }, [])

  useEffect(() => {
    const uploadLimit = 5
    if (
      uploading.uploading.length < uploadLimit &&
      uploading.waiting.length > 0
    ) {
      const photoId = uploading.waiting[0]
      const photo = photos.find((photo) => photo.id === photoId)
      if (photo) {
        actions.setPhotoUploading(photo.id)
        postMedia(photo.file, user)
          .then((res) => {
            actions.setPhotoUploaded(photo.id)
            if (res.url) {
              actions.setPhotoProperty(photo.id, 'photoUrl', res.url)
            }
          })
          .catch((err) => {
            actions.setPhotoUploadError(photo.id)
            console.log('Error uploading photo: ', err)
          })
      }
    }
  }, [uploading])

  const handleFiles = (files) => {
    const { addPhoto } = actions
    setFullscreen(false)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      addPhoto({
        id: generateId(),
        name: file.name,
        file: file,
        date: moment(),
        latitude: false,
        longitude: false,
        content: '',
      })
    }
  }

  const uploadProps = {
    multiple: true,
    accept: '.jpg,.jpeg,.png,.gif,',
  }

  return (
    <Fragment>
      {/* Uses a hidden upload field that appears over the entire site and a regular button too */}
      <div
        className={classnames('fullscreen-uploader', {
          'fullscreen-uploader--hidden': !fullscreen,
        })}
        onMouseLeave={() => setFullscreen(false)}
        onDragEnd={() => setFullscreen(false)}
        onDragLeave={() => setFullscreen(false)}
      >
        <UploadField
          onFiles={handleFiles}
          containerProps={{ className: 'fullscreen-uploader__dropzone' }}
          uploadProps={uploadProps}
        >
          <span className="button">
            Drop your photos to add them to the gallery
          </span>
        </UploadField>
      </div>
      <UploadField onFiles={handleFiles} uploadProps={uploadProps}>
        <div className="uploader">
          <button className="button">
            Drag your photos here or click to select
          </button>
        </div>
      </UploadField>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  user: state.user.toJS(),
  uploading: state.uploading.toJS(),
  photos: state.photos.toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      addPhoto,
      setPhotoUploading,
      setPhotoUploaded,
      setPhotoProperty,
      setPhotoUploadError,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)
