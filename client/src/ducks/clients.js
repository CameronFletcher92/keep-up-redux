import request from 'superagent'
import { pushState } from 'redux-react-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHED = 'clients/FETCHED'
const CREATED   = 'clients/CREATED'
const UPDATED  = 'clients/UPDATED'
const DELETED = 'clients/DELETED'

// INITIAL STATE
const initialState = Immutable.fromJS({
  allClients: []
})

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

export function navToEdit(id) {
  return (dispatch) => {
    dispatch(pushState(null, '/clients/' + id))
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
      var newClient = Immutable.fromJS(action.client)
      return state.updateIn(['allClients'], list => list.push(newClient))

    case FETCHED:
      var fetchedClients = Immutable.fromJS(action.clients)
      return state.set('allClients', fetchedClients)

    case UPDATED:
      var updatedClient = Immutable.fromJS(action.client)
      var index = state.get('allClients').findIndex((c) => c.get('_id') === updatedClient.get('_id'))
      return state.setIn(['allClients', index], updatedClient)

    default:
      return state
  }
}
