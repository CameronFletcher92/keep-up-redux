import request from 'superagent'
import { pushState } from 'redux-react-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'clients/FETCHING'
const FETCHED = 'clients/FETCHED'

const CREATING   = 'clients/CREATING'
const CREATED   = 'clients/CREATED'

const SAVING = 'clients/SAVING'
const UPDATED  = 'clients/UPDATED'
const DELETED  = 'clients/DELETED'

// INITIAL STATE
const initialState = Immutable.fromJS({
  allClients: {},
  syncing: {},
  isFetching: false
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

export function creating() {
  return {
    type: CREATING
  }
}

export function created(client) {
  return {
    type: CREATED,
    client
  }
}

export function saving(id) {
  return {
    type: SAVING,
    id: id
  }
}


export function updated(client) {
  return {
    type: UPDATED,
    client
  }
}

export function deleted(id) {
  return {
    type: DELETED,
    id
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

    if (client._id) {
      dispatch(saving(client._id))

      // update
      request.put('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))
        }
      })

    } else {
      dispatch(creating())

      // create
      request.post('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))
        }
      })
    }

    // navigate back to view (new/updated model will be marked)
    dispatch(navToView())
  }
}

export function deleteAsync(id) {
  return (dispatch) => {
    dispatch(saving(id))

    request.del('/api/clients/' + id).end((err, res) => {
      if (!err && res.ok) {
        dispatch(deleted(id))
      }
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
      // convert fetched clients to a map by ids
      var indexed = {}
      action.clients.forEach(c => indexed[c._id] = c)
      indexed = Immutable.fromJS(indexed)
      state = state.set('allClients', indexed)
      state = state.set('isFetching', false)
      return state

    case CREATING:
      state = state.set('isFetching', true)
      return state

    case CREATED:
      var newClient = Immutable.fromJS(action.client)
      state = state.setIn(['allClients', newClient.get('_id')], newClient)
      state = state.set('isFetching', false)
      return state

    case SAVING:
      state = state.setIn(['syncing', action.id], true)
      return state

    case UPDATED:
      var updatedClient = Immutable.fromJS(action.client)
      state = state.setIn(['allClients', updatedClient.get('_id')], updatedClient)
      state = state.deleteIn(['syncing', updatedClient.get('_id')])
      return state

    case DELETED:
      state = state.deleteIn(['allClients', action.id])
      state = state.deleteIn(['syncing', action.id])
      return state

    default:
      return state
  }
}
