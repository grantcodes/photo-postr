import { postMedia } from '../modules/rest-api'

export const addPhoto = (photo) => async (dispatch, getState) => {
  const user = getState().user.toJS()
  // const photos = getState().photos.toJS()

  dispatch({
    type: 'ADD_PHOTO',
    photo: { ...photo, uploading: true },
  })

  try {
    const res = await postMedia(photo.file, user)
    if (res.url) {
      return dispatch(
        updatePhoto(photo.id, { uploading: false, photoUrl: res.url })
      )
    } else {
      throw new Error('No URL returned from media endpoint')
    }
  } catch (err) {
    console.error('Error uploading photo: ', err)
    return dispatch(
      updatePhoto(photo.id, {
        uploading: false,
        error: 'Error uploading photo',
      })
    )
  }
}

export const retryPhotoUpload = (photo) => {
  return {
    type: 'RETRY_UPLOAD',
    photo,
  }
}

export const setPhotoProperty = (id, property, value) => {
  return {
    type: 'SET_PHOTO_PROPERTY',
    id,
    property,
    value,
  }
}

export const reorderPhotos = (photoToMove, photoDestination) => {
  return {
    type: 'REORDER_PHOTOS',
    index: photoToMove,
    destination: photoDestination,
  }
}

export const sortByDate = () => ({
  type: 'SORT_PHOTOS_BY_DATE',
})

export const removePhoto = (id) => {
  return {
    type: 'REMOVE_PHOTO',
    id,
  }
}

export const updatePhoto = (id, update) => ({
  type: 'UPDATE_PHOTO',
  id,
  update,
})
