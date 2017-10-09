import { List, Map } from 'immutable';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PHOTO' : {
            return state.push(new Map(action.photo));
        }
        case 'SET_PHOTO_PROPERTY' : {
            const photoIndex = state.findIndex(photo => (photo.get('id') == action.id));
            let photo = state.get(photoIndex);
            photo = photo.set(action.property, action.value);
            return state.set(photoIndex, photo);
        }
        case 'REORDER_PHOTOS': {
            const olditem = state.get(action.index);
            state = state.delete(action.index);
            return state.insert(action.destination, olditem);
        }
        default : {
            return state;
        }
    }
};