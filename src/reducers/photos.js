import { List, Map } from 'immutable'

const initialState = List([])

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PHOTO': {
      return state.push(new Map(action.photo))
    }
    case 'SET_PHOTO_PROPERTY': {
      const photoIndex = state.findIndex(
        (photo) => photo.get('id') === action.id
      )
      let photo = state.get(photoIndex)
      photo = photo.set(action.property, action.value)
      return state.set(photoIndex, photo)
    }
    case 'REORDER_PHOTOS': {
      const olditem = state.get(action.index)
      state = state.delete(action.index)
      return state.insert(action.destination, olditem)
    }
    case 'SORT_PHOTOS_BY_DATE': {
      return state.sort(
        (photoA, photoB) =>
          photoA.get('date').valueOf() - photoB.get('date').valueOf()
      )
    }
    case 'REMOVE_PHOTO': {
      const photoIndex = state.findIndex(
        (photo) => photo.get('id') === action.id
      )
      if (photoIndex > -1) {
        state = state.splice(photoIndex, 1)
      }
      return state
    }
    case 'SET_UPLOAD_ERROR': {
      const photoIndex = state.findIndex(
        (photo) => photo.get('id') === action.photoId
      )
      if (photoIndex > -1) {
        let photo = state.get(photoIndex)
        photo = photo.set('error', 'Error uploading file to media endpoint')
        state = state.set(photoIndex, photo)
      }
      return state
    }
    case 'RETRY_UPLOAD': {
      const photoIndex = state.findIndex(
        (photo) => photo.get('id') === action.id
      )
      let photo = state.get(photoIndex)
      if (photo) {
        photo = photo.delete('error')
        state = state.set(photoIndex, photo)
      }
      return state
    }
    default: {
      return state
    }
  }
}
