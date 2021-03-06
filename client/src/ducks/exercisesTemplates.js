import request from 'superagent'
import { pushState } from 'redux-router'
import { showMessage } from './global'
import Immutable from 'immutable'

// CONSTANTS
const FETCHING = 'templates/exercises/FETCHING'
const FETCHED = 'templates/exercises/FETCHED'

const CREATING = 'templates/exercises/CREATING'
const CREATED = 'templates/exercises/CREATED'

const SAVING = 'templates/exercises/SAVING'
const UPDATED = 'templates/exercises/UPDATED'
const DELETED = 'templates/exercises/DELETED'

const UPDATE_FORM = 'templates/exercises/UPDATE_FORM'
const RESET_FORM = 'templates/exercises/RESET_FORM'

const UPDATE_SEARCH = 'templates/exercises/UPDATE_SEARCH'

const TOGGLE_CLIENT = 'sessions/TOGGLE_CLIENT'

// INITIAL STATE
const initialState = Immutable.fromJS({
  entities: {},
  syncing: {},
  isFetching: false,
  search: '',
  form: {
    _id: '',
    name: '',
    exercises: {}
  }
})

// HELPER FUNCTIONS
function normalize(template) {
  const exercises = {}
  template.exercises.forEach(id => {
    exercises[id] = true
  })

  return { ...template, exercises }
}

function denormalize(template) {
  const exercises = Object.keys(template.exercises)

  return { ...template, exercises }
}

// ACTIONS
export function fetching() {
  return {
    type: FETCHING
  }
}

export function fetched(templates) {
  return {
    type: FETCHED,
    templates
  }
}

export function creating() {
  return {
    type: CREATING
  }
}

export function created(template) {
  return {
    type: CREATED,
    template
  }
}

export function saving(id) {
  return {
    type: SAVING,
    id: id
  }
}


export function updated(template) {
  return {
    type: UPDATED,
    template
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

export function toggleExercise(id) {
  return {
    type: TOGGLE_CLIENT,
    id
  }
}

// ASYNC ACTIONS
export function fetchAsync() {
  return (dispatch) => {
    dispatch(fetching())

    request.get('/api/templates/exercises').end((err, res) => {
      dispatch(fetched(res.body))
    })
  }
}

export function saveAsync(template) {
  return (dispatch) => {
    // convert exercises / exercises map back into simple arrays
    template = denormalize(template)

    if (template._id) {
      dispatch(saving(template._id))

      // update
      request.put('/api/templates/exercises').send(template).end((err, res) => {
        if (!err && res.ok) {
          dispatch(updated(res.body))

          const message = '\'' + res.body.name + '\' updated'
          dispatch(showMessage(message))
        }
      })
    } else {
      dispatch(creating())

      // create
      request.post('/api/templates/exercises').send(template).end((err, res) => {
        if (!err && res.ok) {
          dispatch(created(res.body))

          const message = '\'' + res.body.name + '\' created'
          dispatch(showMessage(message))
        }
      })
    }

    // clear the form
    dispatch(resetForm())

    // navigate back to view (new/updated model will be marked)
    dispatch(pushState({ title: 'Exercises Templates' }, '/templates/exercises'))
  }
}

export function deleteAsync(id) {
  return (dispatch) => {
    dispatch(saving(id))

    request.del('/api/templates/exercises/' + id).end((err, res) => {
      if (!err && res.ok) {
        dispatch(deleted(id))
        dispatch(showMessage('Exercises Template deleted'))
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
    // convert fetched templates to a map by ids
    let indexed = new Immutable.OrderedMap()
    action.templates.forEach(template => indexed = indexed.set(template._id, Immutable.fromJS(normalize(template))))
    state = state.set('entities', indexed)
    state = state.set('isFetching', false)
    return state

  case CREATING:
    state = state.set('isFetching', true)
    return state

  case CREATED:
    const newTemplate = Immutable.fromJS(normalize(action.template))
    // add and sort the entities
    state = state.setIn(['entities', newTemplate.get('_id')], newTemplate)
    state = state.set('entities', state.get('entities').sortBy(en => en.get('name').toLowerCase()))
    state = state.set('isFetching', false)
    return state

  case SAVING:
    state = state.setIn(['syncing', action.id], true)
    return state

  case UPDATED:
    const updatedTemplate = Immutable.fromJS(normalize(action.template))
    state = state.setIn(['entities', updatedTemplate.get('_id')], updatedTemplate)
    state = state.deleteIn(['syncing', updatedTemplate.get('_id')])
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

  case UPDATE_SEARCH:
    state = state.set('search', action.value)
    return state
    
  case TOGGLE_CLIENT:
    if (state.getIn(['form', 'exercises', action.id])) {
      // if the id exists in exercises, remove it
      state = state.deleteIn(['form', 'exercises', action.id])
    } else {
      // if it doesn't exist, add it
      state = state.setIn(['form', 'exercises', action.id], true)
    }
    return state

  default:
    return state
  }
}
