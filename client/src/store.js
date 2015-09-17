import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerStateReducer } from 'redux-react-router'
import thunk from 'redux-thunk'
import { reducer as clientsReducer } from './ducks/clients'
import router from './router'

// Combine router reducer with all the ducks' reducers
// This will become the top level of the global state
var reducers = {
                router : routerStateReducer,
                clients : clientsReducer
               }
const rootReducer = combineReducers(reducers)

// initialize the store, with or without devtools
var store
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

export default store
