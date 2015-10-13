import React from 'react'
import { Route, IndexRoute } from 'react-router'
import TopBar from './smart/TopBar'
import ClientForm from './smart/ClientForm'
import ClientsList from './smart/ClientsList'
import ExerciseForm from './smart/ExerciseForm'
import ExercisesList from './smart/ExercisesList'
import SessionsList from './smart/SessionsList'
import SessionForm from './smart/SessionForm'

// route definitions
const routes = (
  <Route path='/' component={TopBar}>
    <IndexRoute component={ClientsList} />
    <Route path='clients' component={ClientsList} />
    <Route path='clients/new' component={ClientForm} />
    <Route path='clients/:id' component={ClientForm} />
    <Route path='exercises' component={ExercisesList} />
    <Route path='exercises/new' component={ExerciseForm} />
    <Route path='exercises/:id' component={ExerciseForm} />
    <Route path='sessions' component={SessionsList} />
    <Route path='sessions/new' component={SessionForm} />
    <Route path='sessions/:id' component={SessionForm} />
  </Route>
)

export default routes
