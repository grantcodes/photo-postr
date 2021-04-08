import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UploadZone from './UploadZone'
import {
  addPhoto,
  setPhotoUploading,
  setPhotoUploaded,
  setPhotoProperty,
  setPhotoUploadError,
} from '../../actions'
import moment from 'moment'
import { generate as generateId } from 'shortid'
import classnames from 'classnames'
import { postMedia } from '../../modules/rest-api'
import '../../styles/uploader.css'

const Uploader = () => {
  const dispatch = useDispatch()
  const { user, uploading, photos } = useSelector((state) => ({
    user: state.user.toJS(),
    uploading: state.uploading.toJS(),
    photos: state.photos.toJS(),
  }))

  const [fullscreen, setFullscreen] = useState(false)
  const enableFullscreen = () => setFullscreen(true)
  const disableFullscreen = () => setFullscreen(false)

  useEffect(() => {
    // Add listener for drag events and make the drop zone cover the whole screen
    window.addEventListener('dragenter', enableFullscreen)
    window.addEventListener('dragend', disableFullscreen)
    return () => {
      window.removeEventListener('dragenter', enableFullscreen)
      window.removeEventListener('dragend', disableFullscreen)
    }
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
        dispatch(setPhotoUploading(photo.id))
        postMedia(photo.file, user)
          .then((res) => {
            dispatch(setPhotoUploaded(photo.id))
            if (res.url) {
              dispatch(setPhotoProperty(photo.id, 'photoUrl', res.url))
            }
          })
          .catch((err) => {
            dispatch(setPhotoUploadError(photo.id))
            console.log('Error uploading photo: ', err)
          })
      }
    }
  }, [uploading])

  const handleFiles = (files) => {
    setFullscreen(false)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      dispatch(
        addPhoto({
          id: generateId(),
          name: file.name,
          file: file,
          date: moment(),
          latitude: false,
          longitude: false,
          content: '',
        })
      )
    }
  }

  const uploadProps = {
    multiple: true,
    accept: '.jpg,.jpeg,.png,.gif,',
  }

  return (
    <UploadZone
      onFiles={handleFiles}
      inputProps={uploadProps}
      onMouseLeave={disableFullscreen}
      onDragEnd={disableFullscreen}
      onDragLeave={disableFullscreen}
      className={classnames('uploader', {
        'uploader--fullscreen': fullscreen,
      })}
    >
      <span className="uploader__button button">
        Drag your photos here or click to select
      </span>
    </UploadZone>
  )
}

export default Uploader
