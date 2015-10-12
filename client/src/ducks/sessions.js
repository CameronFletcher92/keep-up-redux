import request from 'superagent'
import { pushState } from 'redux-react-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'sessions/FETCHING'
const FETCHED = 'sessions/FETCHED'

const CREATING   = 'sessions/CREATING'
const CREATED   = 'sessions/CREATED'

const SAVING = 'sessions/SAVING'
const UPDATED  = 'sessions/UPDATED'
const DELETED  = 'sessions/DELETED'

const UPDATE_FORM = 'sessions/UPDATE_FORM'
const RESET_FORM = 'sessions/RESET_FORM'

// INITIAL STATE
const initialState = Immutable.fromJS({
  entities: {},
  syncing: {},
  isFetching: false,
  form: {
    _id: '',
    name: '',
    description: '',
    intensity: ''
  }
})

// ACTIONS
export function fetching() {
  return {
    type: FETCHING
  }
}

export function fetched(sessions) {
  return {
    type: FETCHED,
    sessions
  }
}

export function creating() {
  return {
    type: CREATING
  }
}

export function created(session) {
  return {
    type: CREATED,
    session
  }
}

export function saving(id) {
  return {
    type: SAVING,
    id: id
  }
}


export function updated(session) {
  return {
    type: UPDATED,
    session
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

// NAVIGATION ACTIONS
export function navToViewSessions() {
  return (dispatch) => {
    dispatch(pushState(null, '/sessions'))
  }
}

export function navToCreateSession() {
  return (dispatch) => {
    dispatch(resetForm())
    dispatch(pushState(null, '/sessions/new'))
  }
}

export function navToEditSession(id) {
  return (dispatch) => {
    dispatch(resetForm(id))
    dispatch(pushState(null, '/sessions/' + id))
  }
}


// ASYNC ACTIONS
export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get('/api/sessions').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

export function saveAsync(session) {
  return (dispatch) => {

    if (session._id) {
      dispatch(saving(session._id))

      // update
      request.put('/api/sessions').send(session).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))
        }
      })

    } else {
      dispatch(creating())

      // create
      request.post('/api/sessions').send(session).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))
        }
      })
    }

    // clear the form
    dispatch(resetForm())

    // navigate back to view (new/updated model will be marked)
    dispatch(navToViewSessions())
  }
}

export function deleteAsync(id) {
  return (dispatch) => {
    dispatch(saving(id))

    request.del('/api/sessions/' + id).end((err, res) => {
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
      // convert fetched sessions to a map by ids
      let indexed = {}
      action.sessions.forEach(c => indexed[c._id] = c)
      indexed = Immutable.fromJS(indexed)
      state = state.set('entities', indexed)
      state = state.set('isFetching', false)
      return state

    case CREATING:
      state = state.set('isFetching', true)
      return state

    case CREATED:
      let newSession = Immutable.fromJS(action.session)
      state = state.setIn(['entities', newSession.get('_id')], newSession)
      state = state.set('isFetching', false)
      return state

    case SAVING:
      state = state.setIn(['syncing', action.id], true)
      return state

    case UPDATED:
      let updatedSession = Immutable.fromJS(action.session)
      state = state.setIn(['entities', updatedSession.get('_id')], updatedSession)
      state = state.deleteIn(['syncing', updatedSession.get('_id')])
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
        // set initial form state to be id's entity
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
