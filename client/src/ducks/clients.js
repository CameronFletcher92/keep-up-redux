import request from 'superagent'
import { pushState } from 'redux-react-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'clients/FETCHING'
const FETCHED = 'clients/FETCHED'
const SAVING = 'clients/SAVING'
const CREATED   = 'clients/CREATED'
const UPDATED  = 'clients/UPDATED'
const DELETED = 'clients/DELETED'

// INITIAL STATE
const initialState = Immutable.fromJS({
  allClients: {},
  isBusy: false
})

// ACTIONS
export function fetching() {
  return {
    type: FETCHING
  }
}

export function fetched(clients) {
  return {
    type: FETCHED,
    clients
  }
}

export function saving() {
  return {
    type: SAVING
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

export function deleted(client) {
  return {
    type: DELETED,
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

export function navToEdit(id) {
  return (dispatch) => {
    dispatch(pushState(null, '/clients/' + id))
  }
}


// ASYNC ACTIONS
export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get('/api/clients').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

export function saveAsync(client) {
  return (dispatch) => {
    dispatch(saving())

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
      var newClient = Immutable.fromJS(action.client)
      state = state.setIn(['allClients', newClient.get('_id')], newClient)
      state = state.set('isBusy', false)
      return state

    case FETCHED:
      // convert fetched clients to a map by ids
      var indexed = {}
      action.clients.forEach(c => indexed[c._id] = c)
      indexed = Immutable.fromJS(indexed)

      state = state.set('allClients', indexed)
      state = state.set('isBusy', false)
      return state

    case UPDATED:
      var updatedClient = Immutable.fromJS(action.client)
      state = state.setIn(['allClients', updatedClient.get('_id')], updatedClient)
      state = state.set('isBusy', false)
      return state

    case FETCHING:
      state = state.set('isBusy', true)
      return state

    case SAVING:
      state = state.set('isBusy', true)
      return state

    default:
      return state
  }
}
