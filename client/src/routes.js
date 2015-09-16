import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { reduxReactRouter } from 'redux-react-router'
import { createHistory } from 'history'
import App from './smart/App'
import ClientsList from './smart/ClientsList'
import Counter from './smart/Counter'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={ClientsList} />
    <Route path='counter' component={Counter} />
    <Route path='clients' component={ClientsList} />
  </Route>
)

export default reduxReactRouter({ routes, createHistory })
