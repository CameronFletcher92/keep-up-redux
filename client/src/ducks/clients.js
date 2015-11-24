import request from 'superagent'
import { pushState } from 'redux-router'
import { showMessage } from './global'
import Immutable from 'immutable'
import { getNow } from '../util/dateHelper'

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

const UPDATE_SEARCH = 'clients/UPDATE_SEARCH'

const FETCHING_REPORT = 'clients/FETCHING_REPORT'
const FETCHED_REPORT = 'clients/FETCHED_REPORT'

// INITIAL STATE
const initialState = Immutable.fromJS({
  entities: {},
  syncing: {},
  isFetching: false,
  search: '',
  form: {
    _id: '',
    firstName: '',
    lastName: '',
    birthDate: getNow(),
    address: '',
    notes: '',
    privateHealth: false
  },
  report: {
    name: '',
    sessions: [],
    exercises: {}
  }
})

// ACTIONS
export function fetchingReport() {
  return {
    type: FETCHING_REPORT
  }
}

export function fetchedReport(report) {
  return {
    type: FETCHED_REPORT,
    report
  }
}

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

export function updateSearch(value) {
  return {
    type: UPDATE_SEARCH,
    value
  }
}

/**
 * Fetches a report for a single customer, given their id
 * @param  {string} id      the customer id
 * @param  {date} startDate   the minimum date for the report
 * @param  {date} endDate   the maximum date for the report
 */
export function fetchReportAsync(id, startDate, endDate) {
  return (dispatch) => {
    dispatch(fetchingReport())

    const start = startDate ? startDate.toISOString() : null
    const end = endDate ? endDate.toISOString() : null
    request.get('/api/reports/clients/' + id).query({ start, end }).end((err, res) => {
      dispatch(fetchedReport(res.body))
    })
  }
}

/**
 * Fetches the clients
 */
export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get('/api/clients').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

/**
 * Saves a client
 * @param  {object} client  the client to save
 */
export function saveAsync(client) {
  return (dispatch) => {
    if (client._id) {
      dispatch(saving(client._id))

      // update
      request.put('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))

          const message = '\'' + res.body.firstName + ' ' + res. body.lastName + '\' updated'
          dispatch(showMessage(message))
        }
      })
    } else {
      dispatch(creating())

      // create
      request.post('/api/clients').send(client).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))

          const message = '\'' + res.body.firstName + ' ' + res. body.lastName + '\' created'
          dispatch(showMessage(message))
        }
      })
    }

    // clear the form
    dispatch(resetForm())

    // navigate back to view (new/updated model will be marked)
    dispatch(pushState({ title: 'Clients' }, '/clients'))
  }
}

/**
 * Delete a client by their ID
 * @param  {string} id  the client's id
 */
export function deleteAsync(id) {
  return (dispatch) => {
    dispatch(saving(id))

    request.del('/api/clients/' + id).end((err, res) => {
      if (!err && res.ok) {
        dispatch(deleted(id))
        dispatch(showMessage('Client deleted'))
      }
    })
  }
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCHING_REPORT:
    return state.set('isFetching', true)

  case FETCHED_REPORT:
    state = state.set('report', Immutable.fromJS(action.report))
    state = state.set('isFetching', false)
    return state

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
    // add and sort the entities
    state = state.setIn(['entities', newClient.get('_id')], newClient)
    state = state.set('entities', state.get('entities').sortBy(en => en.get('lastName').toLowerCase()))
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

  case UPDATE_SEARCH:
    state = state.set('search', action.value)
    return state

  default:
    return state
  }
}
