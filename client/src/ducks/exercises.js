import request from 'superagent'
import { pushState } from 'redux-react-router'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'exercises/FETCHING'
const FETCHED = 'exercises/FETCHED'

const CREATING   = 'exercises/CREATING'
const CREATED   = 'exercises/CREATED'

const SAVING = 'exercises/SAVING'
const UPDATED  = 'exercises/UPDATED'
const DELETED  = 'exercises/DELETED'

const UPDATE_FORM = 'exercises/UPDATE_FORM'
const RESET_FORM = 'exercises/RESET_FORM'

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

export function fetched(exercises) {
  return {
    type: FETCHED,
    exercises
  }
}

export function creating() {
  return {
    type: CREATING
  }
}

export function created(exercise) {
  return {
    type: CREATED,
    exercise
  }
}

export function saving(id) {
  return {
    type: SAVING,
    id: id
  }
}


export function updated(exercise) {
  return {
    type: UPDATED,
    exercise
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
export function navToViewExercises() {
  return (dispatch) => {
    dispatch(pushState(null, '/exercises'))
  }
}

export function navToCreateExercise() {
  return (dispatch) => {
    dispatch(resetForm())
    dispatch(pushState(null, '/exercises/new'))
  }
}

export function navToEditExercise(id) {
  return (dispatch) => {
    dispatch(resetForm(id))
    dispatch(pushState(null, '/exercises/' + id))
  }
}


// ASYNC ACTIONS
export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get('/api/exercises').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

export function saveAsync(exercise) {
  return (dispatch) => {

    if (exercise._id) {
      dispatch(saving(exercise._id))

      // update
      request.put('/api/exercises').send(exercise).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))
        }
      })

    } else {
      dispatch(creating())

      // create
      request.post('/api/exercises').send(exercise).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))
        }
      })
    }

    // clear the form
    dispatch(resetForm())

    // navigate back to view (new/updated model will be marked)
    dispatch(navToViewExercises())
  }
}

export function deleteAsync(id) {
  return (dispatch) => {
    dispatch(saving(id))

    request.del('/api/exercises/' + id).end((err, res) => {
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
      // convert fetched exercises to a map by ids
      let indexed = {}
      action.exercises.forEach(c => indexed[c._id] = c)
      indexed = Immutable.fromJS(indexed)
      state = state.set('entities', indexed)
      state = state.set('isFetching', false)
      return state

    case CREATING:
      state = state.set('isFetching', true)
      return state

    case CREATED:
      let newExercise = Immutable.fromJS(action.exercise)
      state = state.setIn(['entities', newExercise.get('_id')], newExercise)
      state = state.set('isFetching', false)
      return state

    case SAVING:
      state = state.setIn(['syncing', action.id], true)
      return state

    case UPDATED:
      let updatedExercise = Immutable.fromJS(action.exercise)
      state = state.setIn(['entities', updatedExercise.get('_id')], updatedExercise)
      state = state.deleteIn(['syncing', updatedExercise.get('_id')])
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
