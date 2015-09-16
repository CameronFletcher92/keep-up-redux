import request from 'superagent'
import { pushState } from 'redux-react-router'

// CONSTANTS
const FETCHED = 'clients/FETCHED'
const CREATED   = 'clients/CREATED'
const UPDATED  = 'clients/UPDATED'
const DELETED = 'clients/DELETED'
const ACTIVE_CHANGED = 'clients/ACTIVE_CHANGED'
const RESET_ACTIVE = 'clients/RESET_ACTIVE'

// INITIAL STATE
const initialState = {
  allClients: [],
  activeClient: {
    firstName: '',
    lastName: '',
    birthDate: ''
  }
}

// ACTIONS
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

export function fetched(clients) {
  return {
    type: FETCHED,
    clients
  }
}

export function activeChanged(client) {
  return {
    type: ACTIVE_CHANGED,
    client
  }
}

export function resetActive() {
  return {
    type: RESET_ACTIVE
  }
}

// NAVIGATION ACTIONS
export function navToView(client) {
  return (dispatch) => {
    dispatch(fetchAsync())
    dispatch(pushState(null, '/clients'))
  }
}

export function navToEdit(client) {
  return (dispatch) => {
    dispatch(activeChanged(client))
    dispatch(pushState(null, '/clients/edit'))
  }
}

export function navToCreate() {
  return (dispatch) => {
    dispatch(resetActive())
    dispatch(pushState(null, '/clients/new'))
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

export function createAsync(client) {
  return (dispatch) => {
    request.post('/api/clients').send(client).end((err, res) => {
      dispatch(created(res.body))
    })
  }
}

export function updateAsync(client) {
  return (dispatch) => {
    request.put('/api/clients').send(client).end((err, res) => {
      dispatch(updated(res.body))
    })
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {

    case CREATED:
      return {...state, allClients: [...(state.clients), action.client] }

    case FETCHED:
      return {...state, allClients: action.clients }

    case UPDATED:
      let newState = {...state}
      console.log('updated client', action.client)
      return newState

    case ACTIVE_CHANGED:
      return {...state, activeClient: action.client}

    case RESET_ACTIVE:
      return {...state, activeClient: initialState.activeClient}

    default:
      return state
  }
}
