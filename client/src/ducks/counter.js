const INCREMENT   = 'counter/INCREMENT'
const DECREMENT   = 'counter/DECREMENT'

// INITIAL STATE
const initialState = {
  count: 0,
  label: 'sup'
}

// ACTION CREATORS
export function increment(amount = 1) {
  return {
    type: INCREMENT,
    amount
  }
}

export function decrement(amount = 1) {
  return {
    type: DECREMENT,
    amount
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter.count % 2 === 0) {
      return
    }

    dispatch(increment(1))
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {

    case INCREMENT:
      return {...state, count: state.count + action.amount }

    case DECREMENT:
      return {...state, count: state.count - action.amount }
      
    default:
      return state
  }
}
