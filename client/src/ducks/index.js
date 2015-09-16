import { combineReducers } from 'redux'
import * as clients from './clients'
import * as counter from './counter'
import { routerStateReducer } from 'redux-react-router'

// export the root reducer, these become the top level of the global tree
export default combineReducers(
  {
    router: routerStateReducer,
    clients: clients.reducer,
    counter: counter.reducer
  }
)
