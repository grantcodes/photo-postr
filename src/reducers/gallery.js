import { Map } from 'immutable';

const initialState = Map({
    name: '',
    content: '',
    slug: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GALLERY_NAME' : {
            return state.set('name', action.value);
        }
        case 'SET_GALLERY_CONTENT' : {
            return state.set('content', action.value);
        }
        case 'SET_GALLERY_SLUG' : {
            return state.set('slug', action.value);
        }
        default : {
            return state;
        }
    }
};