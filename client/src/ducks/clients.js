const ADD   = 'clients/ADD'
const FETCH = 'clients/FETCH'
const UPDATE = 'clients/UPDATE'
const REMOVE = 'clients/REMOVE'

const initialState = {
  clients: [{firstName: 'John', lastName: 'Doe'}]
}

export function reducer(state = initialState, action = {}) {
  switch (action.type) {


    // default initial case
    default: return state
  }
}

export function addClient(client) {
  return { type: LOAD, client }
}

/*
export function createWidget(widget) = {
  return { type: CREATE, widget }
}

export function updateWidget(widget) = {
  return { type: UPDATE, widget }
}

export function removeWidget(widget) = {
  return { type: REMOVE, widget }
}
*/
