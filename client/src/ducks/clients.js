import request from 'superagent'
import { pushState } from 'redux-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'clients/FETCHING'
const FETCHED = 'clients/FETCHED'

const CREATING = 'clients/CREATING'
const CREATED = 'clients/CREATED'

const SAVING = 'clients/SAVING'
const UPDATED = 'clients/UPDATED'
const DELETED = 'clients/DELETED'

const UPDATE_FORM = 'clients/UPDATE_FORM'
const RESET_FORM = 'clients/RESET_FORM'

// INITIAL STATE
const initialState = Immutable.fromJS({
  entities: {},
  syncing: {},
  isFetching: false,
  form: {
    _id: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    address: '',
    notes: '',
    privateHealth: false
  }
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

export function updateForm(field, value) {
  return {
    type: UPDATE_FORM,
    field,
    value
  }
}

export function resetForm(id) {
  return {
    type: RESET_FORM,
    id
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

    // clear the form
    dispatch(resetForm())

    // navigate back to view (new/updated model will be marked)
    dispatch(pushState(null, '/clients'))
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
    return state.set('isFetching', true)

  case FETCHED:
    // convert fetched clients to a map by ids
    let indexed = new Immutable.OrderedMap()
    action.clients.forEach(client => {
      client.birthDate = new Date(client.birthDate)
      indexed = indexed.set(client._id, Immutable.fromJS(client))
    })
    state = state.set('entities', indexed)
    state = state.set('isFetching', false)
    return state

  case CREATING:
    state = state.set('isFetching', true)
    return state

  case CREATED:
    action.client.birthDate = new Date(action.client.birthDate)
    const newClient = Immutable.fromJS(action.client)
    state = state.setIn(['entities', newClient.get('_id')], newClient)
    state = state.set('isFetching', false)
    return state

  case SAVING:
    state = state.setIn(['syncing', action.id], true)
    return state

  case UPDATED:
    action.client.birthDate = new Date(action.client.birthDate)
    const updatedClient = Immutable.fromJS(action.client)
    state = state.setIn(['entities', updatedClient.get('_id')], updatedClient)
    state = state.deleteIn(['syncing', updatedClient.get('_id')])
    return state

  case DELETED:
    state = state.deleteIn(['entities', action.id])
    state = state.deleteIn(['syncing', action.id])
    return state

  case UPDATE_FORM:
    state = state.setIn(['form', action.field], action.value)
    return state

  case RESET_FORM:
    if (action.id) {
      // set form state to be the target id
      state = state.mergeIn(['form'], state.getIn(['entities', action.id]))
    } else {
      // set form state as it's initial state
      state = state.set('form', initialState.get('form'))
    }
    return state

  default:
    return state
  }
}
