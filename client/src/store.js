import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerStateReducer } from 'redux-react-router'
import thunk from 'redux-thunk'
import router from './router'
import { reducer as clientsReducer } from './ducks/clients'

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

// hot load support
if (__DEV__ && module.hot) {
    module.hot.accept(['./ducks/clients'], () => {
      var reducers = {
                      router : routerStateReducer,
                      clients : require('./ducks/clients').reducer
                     }
      const nextReducer = combineReducers(reducers)
      store.replaceReducer(nextReducer)
    })
}

export default store
