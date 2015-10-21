import request from 'superagent'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'user/FETCHING'
const FETCHED = 'user/FETCHED'

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

    request.get('/api/user').end((err, res) => {
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
    }
    return state

  default:
    return state
  }
}
