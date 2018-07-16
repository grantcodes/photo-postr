import photos from './photos'
import user from './user'
import gallery from './gallery'
import uploading from './uploading'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  photos,
  user,
  gallery,
  uploading,
})
export default rootReducer
