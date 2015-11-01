import Immutable from 'immutable'

// CONSTANTS
const SHOW_MESSAGE = 'global/SHOW_MESSAGE'
const HIDE_MESSAGE = 'global/HIDE_MESSAGE'

// INITIAL STATE
const initialState = Immutable.fromJS({
  message: ''
})

// ACTIONS
export function showMessage(message) {
  return {
    type: SHOW_MESSAGE,
    message
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
  case SHOW_MESSAGE:
    state = state.set('message', action.message)
    return state

  case HIDE_MESSAGE:
    state = state.set('message', '')
    return state

  default:
    return state
  }
}
