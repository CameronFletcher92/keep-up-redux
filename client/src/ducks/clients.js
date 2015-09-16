import request from 'superagent'

// CONSTANTS
const ADD   = 'clients/ADD'
const FETCHED = 'clients/FETCHED'

// INITIAL STATE
const initialState = {
  allClients: []
}

// ACTIONS
export function add(client) {
  return {
    type: ADD,
    client
  }
}

export function fetched(clients) {
  return {
    type: FETCHED,
    clients
  }
}

// ASYNC ACTIONS
export function fetchAsync() {
  return (dispatch) => {
    request.get('/api/clients').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {

    case ADD:
      return {...state, allClients: [...(state.clients), action.client] }

    case FETCHED:
      return {...state, allClients: action.clients }

    default:
      return state
  }
}
