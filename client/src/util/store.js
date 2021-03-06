import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerStateReducer, reduxReactRouter } from 'redux-router'
import DevTools from '../smart/DevTools'
import { createHistory } from 'history'
import thunk from 'redux-thunk'

// Combine router reducer with all the ducks' reducers
// This will become the top level of the global state
// Require it within the function so we can call this on module hotloading
function getRootReducer() {
  const reducers = {
    router: routerStateReducer,
    user: require('../ducks/user').reducer,
    clients: require('../ducks/clients').reducer,
    exercises: require('../ducks/exercises').reducer,
    sessions: require('../ducks/sessions').reducer,
    global: require('../ducks/global').reducer,
    clientsTemplates: require('../ducks/clientsTemplates.js').reducer,
    exercisesTemplates: require('../ducks/exercisesTemplates.js').reducer
  }

  return combineReducers(reducers)
}

const rootReducer = getRootReducer()

// initialize the store, with or without devtools
let store
/* global __DEV__ */
if (__DEV__) {
  store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory: createHistory }),
    DevTools.instrument(),
  )(createStore)(rootReducer)
} else {
  store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory: createHistory }),
  )(createStore)(rootReducer)
}

// hot load support
if (__DEV__ && module.hot) {
  module.hot.accept(
    [
      '../ducks/clients',
      '../ducks/exercises',
      '../ducks/sessions',
      '../ducks/user',
      '../ducks/global',
      '../ducks/clientsTemplates',
      '../ducks/exercisesTemplates'
    ], () => {
    store.replaceReducer(getRootReducer())
  })
}

export default store
