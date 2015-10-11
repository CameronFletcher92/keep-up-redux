import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerStateReducer } from 'redux-react-router'
import thunk from 'redux-thunk'
import router from './router'

// Combine router reducer with all the ducks' reducers
// This will become the top level of the global state
// Require it within the function so we can call this on module hotloading
function getRootReducer() {
  let reducers = {
    router : routerStateReducer,
    clients : require('./ducks/clients').reducer,
    exercises : require('./ducks/exercises').reducer
  }

  return combineReducers(reducers)
}

const rootReducer = getRootReducer()

// initialize the store, with or without devtools
let store
if (__DEV__) {
  const { devTools } = require('redux-devtools')
  store = compose(
    applyMiddleware(thunk),
    router,
    devTools()
  )(createStore)(rootReducer)

} else {
  store = compose(
    applyMiddleware(thunk),
    router
  )(createStore)(rootReducer)
}

// hot load support
if (__DEV__ && module.hot) {
  module.hot.accept(['./ducks/clients', './ducks/exercises'], () => {
    store.replaceReducer(getRootReducer())
  })
}

export default store
