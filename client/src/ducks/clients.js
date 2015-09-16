import request from 'superagent'
import { pushState } from 'redux-react-router'

// CONSTANTS
const FETCHED = 'clients/FETCHED'
const CREATED   = 'clients/CREATED'
const UPDATED  = 'clients/UPDATED'
const DELETED = 'clients/DELETED'

// INITIAL STATE
const initialState = {
  allClients: []
}

// ACTIONS
export function fetched(clients) {
  return {
    type: FETCHED,
    clients
  }
}
export function created(client) {
  return {
    type: CREATED,
    client
  }
}

export function updated(client) {
  return {
    type: UPDATED,
    client
  }
}

export function removed(client) {
  return {
    type: REMOVED,
    client
  }
}

// NAVIGATION ACTIONS
export function navToView() {
  return (dispatch) => {
    dispatch(pushState(null, '/clients'))
  }
}

export function navToCreate() {
  return (dispatch) => {
    dispatch(pushState(null, '/clients/new'))
  }
}

export function navToEdit(client) {
  return (dispatch) => {
    dispatch(pushState(null, '/clients/edit'))
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

export function saveAsync(client) {
  return (dispatch) => {
    if (client._id) {
      // update
      request.put('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))
          dispatch(navToView())
        }
      })

    } else {
      // create
      request.post('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))
          dispatch(navToView())
        }
      })

    }
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {

    case CREATED:
      return {...state, allClients: [...state.allClients, action.client]}

    case FETCHED:
      return {...state, allClients: action.clients }

    case UPDATED:
      console.log('updated client', action.client)
      let newState = {...state}
      let matches = newState.allClients.filter(c => c._id === action.client._id)
      console.log('matches', matches)
      matches[0] = action.client
      return newState

    default:
      return state
  }
}
