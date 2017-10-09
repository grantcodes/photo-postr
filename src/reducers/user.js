import { Map } from 'immutable';

let initialState = Map({
  me: null,
  state: null,
  token: null,
  mediaEndpoint: null,
  micropubEndpoint: null,
});

// Load values from local storage
const localStorageOptions = ['me', 'tokenEndpoint', 'micropubEndpoint', 'token', 'mediaEndpoint', 'state'];

localStorageOptions.forEach((option) => {
  const value =  localStorage.getItem(option);
  if (value) {
    initialState = initialState.set(option, value);
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_OPTION' : {
      return state.set(action.property, action.value);
    }
    default : {
      return state;
    }
  }
};