import { Map } from 'immutable'

const initialState = Map({
  orderGridShown: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_GRID_SHOW': {
      return state.set('orderGridShown', true)
    }
    case 'ORDER_GRID_HIDE': {
      return state.set('orderGridShown', false)
    }
    default: {
      return state
    }
  }
}
