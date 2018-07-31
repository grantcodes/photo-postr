import photos from './photos'
import user from './user'
import gallery from './gallery'
import uploading from './uploading'
import app from './app'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  photos,
  user,
  gallery,
  uploading,
  app,
})
export default rootReducer
