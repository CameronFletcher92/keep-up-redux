import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { reduxReactRouter } from 'redux-react-router'
import { createHistory } from 'history'
import TopBar from './smart/TopBar'
import ClientForm from './smart/ClientForm'
import ClientsList from './smart/ClientsList'

const routes = (
  <Route path='/' component={TopBar}>
    <IndexRoute component={ClientsList} />
    <Route path='clients' component={ClientsList} />
    <Route path='clients/new' component={ClientForm} />
    <Route path='clients/:id' component={ClientForm} />
  </Route>
)

export default reduxReactRouter({ routes, createHistory })
