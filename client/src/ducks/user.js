import request from 'superagent'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'user/FETCHING'
const FETCHED = 'user/FETCHED'

/* global __CORDOVA__ */
const API_ROOT = __CORDOVA__ ? 'http://keep-up-app.herokuapp.com' : ''

// INITIAL STATE
const initialState = Immutable.fromJS({
  isFetching: false,
  isLoggedIn: false,
  entity: {}
})

// ACTIONS
export function fetching() {
  return {
    type: FETCHING
  }
}

export function fetched(user) {
  return {
    type: FETCHED,
    user
  }
}

export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get(API_ROOT + '/api/user').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCHING:
    state = state.set('isFetching', true)
    return state

  case FETCHED:
    state = state.set('isFetching', false)
    if (action.user) {
      state = state.set('isLoggedIn', true)
      state = state.set('entity', Immutable.fromJS(action.user))

      // dirty hack: set the browser close confirmation
      /* global __DEV__ */
      /*
      if (!__DEV__) {
        window.onbeforeunload = () => 'Keep-Up will have to re-fetch data if you leave this page.'
      }
      */
    }
    return state

  default:
    return state
  }
}
