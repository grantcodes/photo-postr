import { Map, List } from 'immutable'

const initialState = new Map({
  uploading: new List([]),
  uploaded: new List([]),
  waiting: new List([]),
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PHOTO': {
      return state.update('waiting', (waiting) => waiting.push(action.photo.id))
    }
    case 'SET_UPLOAD_UPLOADING': {
      // Remove from waiting.
      state = state.update('waiting', (waiting) =>
        waiting.filterNot((photoId) => photoId === action.photoId)
      )
      // Add to uploading.
      return state.update('uploading', (uploading) =>
        uploading.push(action.photoId)
      )
    }
    case 'SET_UPLOAD_UPLOADED': {
      // Remove from uploading.
      state = state.update('uploading', (uploading) =>
        uploading.filterNot((photoId) => photoId === action.photoId)
      )
      // Add to uploaded.
      return state.update('uploaded', (uploaded) =>
        uploaded.push(action.photoId)
      )
    }
    case 'SET_UPLOAD_ERROR': {
      // Remove from uploading.
      return state.update('uploading', (uploading) =>
        uploading.filterNot((photoId) => photoId === action.photoId)
      )
    }
    case 'RETRY_UPLOAD': {
      return state.update('waiting', (waiting) => waiting.push(action.photo.id))
    }
    case 'REMOVE_PHOTO': {
      state = state.update('waiting', (waiting) =>
        waiting.filterNot((photoId) => photoId === action.id)
      )
      state = state.update('uploading', (uploading) =>
        uploading.filterNot((photoId) => photoId === action.id)
      )
      return state.update('uploaded', (uploaded) =>
        uploaded.filterNot((photoId) => photoId === action.id)
      )
    }
    default: {
      return state
    }
  }
}
