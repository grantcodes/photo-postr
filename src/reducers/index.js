import photos from './photos';
import user from './user';
import gallery from './gallery';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    photos,
    user,
    gallery,
});
export default rootReducer;