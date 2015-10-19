import React from 'react'
import store from './store.js'
import { Route, IndexRoute } from 'react-router'
import TopBar from './smart/TopBar'
import ClientForm from './smart/ClientForm'
import ClientsList from './smart/ClientsList'
import ExerciseForm from './smart/ExerciseForm'
import ExercisesList from './smart/ExercisesList'
import SessionsList from './smart/SessionsList'
import SessionForm from './smart/SessionForm'
import SplashPage from './smart/SplashPage'

function requireAuth(nextState, replaceState) {
  if (!store.getState().user.get('isLoggedIn')) {
    // redirect back to login.
    replaceState({ nextPathname: nextState.location.pathname }, '/')
  }
}

// route definitions
const routes = (
  <Route path='/' component={TopBar}>
    <IndexRoute component={SplashPage} />

    <Route path='clients' component={ClientsList} onEnter={requireAuth} />
    <Route path='clients/new' component={ClientForm} onEnter={requireAuth} />
    <Route path='clients/:id' component={ClientForm} onEnter={requireAuth} />

    <Route path='exercises' component={ExercisesList} onEnter={requireAuth} />
    <Route path='exercises/new' component={ExerciseForm} onEnter={requireAuth} />
    <Route path='exercises/:id' component={ExerciseForm} onEnter={requireAuth} />

    <Route path='sessions' component={SessionsList} onEnter={requireAuth} />
    <Route path='sessions/new' component={SessionForm} onEnter={requireAuth} />
    <Route path='sessions/:id' component={SessionForm} onEnter={requireAuth} />
  </Route>
)

export default routes
