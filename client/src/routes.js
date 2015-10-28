import React from 'react'
import { Route, IndexRoute } from 'react-router'
import TopBar from './smart/TopBar'
import ClientForm from './smart/ClientForm'
import ClientsList from './smart/ClientsList'
import ExerciseForm from './smart/ExerciseForm'
import ExercisesList from './smart/ExercisesList'
import SessionsList from './smart/SessionsList'
import SessionForm from './smart/SessionForm'
import SplashPage from './smart/SplashPage'
import ReportsList from './smart/ReportsList'
import Report from './smart/Report'

function readCookie(name) {
  name += '='
  for (let ca = document.cookie.split(/;\s*/), index = ca.length - 1; index >= 0; index--) {
    if (!ca[index].indexOf(name)) {
      return ca[index].replace(name, '')
    }
  }
}

function requireAuth(nextState, replaceState) {
  const cookie = readCookie('userid')
  console.log('cookie', cookie)

  if (!cookie) {
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

    <Route path='reports' component={ReportsList} onEnter={requireAuth} />
    <Route path='reports/:id' component={Report} onEnter={requireAuth} />
  </Route>
)

export default routes
