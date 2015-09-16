import { combineReducers } from 'redux'
import * as clients from './clients'
import * as counter from './counter'

// export the root reducer, these become the top level of the global tree
export default combineReducers(
  {
    clients: clients.reducer,
    counter: counter.reducer
  }
)
