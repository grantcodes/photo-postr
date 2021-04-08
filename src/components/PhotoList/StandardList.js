import React from 'react'
import { useDispatch } from 'react-redux'
import Photo from '../Photo'
import { reorderPhotos, removePhoto, retryPhotoUpload } from '../../actions'

const PhotoList = ({ photos }) => {
  const dispatch = useDispatch()

  return photos.map((photo, i) => (
    <div className="photo-wrapper" key={`photo-${i}`}>
      <Photo file={photo.file} photo={photo} />
      <div className="photo-actions">
        <button onClick={(e) => dispatch(removePhoto(photo.id))}>❌</button>
        {photos.length > 1 && i > 0 && (
          <button onClick={(e) => dispatch(reorderPhotos(i, i - 1))}>👆</button>
        )}
        {photos.length > 1 && i < photos.length - 1 && (
          <button onClick={(e) => dispatch(reorderPhotos(i, i + 1))}>👇</button>
        )}
        {photo.error && (
          <button onClick={(e) => dispatch(retryPhotoUpload(photo))}>
            Retry Upload
          </button>
        )}
      </div>
    </div>
  ))
}

export default PhotoList
