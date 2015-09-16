import { combineReducers } from 'redux'
import * as clients from './clients'
import * as counter from './counter'

// export the root reducer
export default combineReducers(
  {
    clients: clients.reducer,
    counter: counter.reducer
  }
)
