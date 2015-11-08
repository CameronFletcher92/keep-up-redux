import React from 'react'
import { Route, IndexRoute } from 'react-router'
import TopBar from '../smart/TopBar'
import ClientForm from '../smart/ClientForm'
import ClientsList from '../smart/ClientsList'
import ExerciseForm from '../smart/ExerciseForm'
import ExercisesList from '../smart/ExercisesList'
import SessionsList from '../smart/SessionsList'
import SessionForm from '../smart/SessionForm'
import SplashPage from '../smart/SplashPage'
import ClientReportsList from '../smart/ClientReportsList'
import ClientReport from '../smart/ClientReport'
import ClientsTemplatesList from '../smart/ClientsTemplatesList'
import ClientsTemplateForm from '../smart/ClientsTemplateForm'
import ExercisesTemplatesList from '../smart/ExercisesTemplatesList'
import ExercisesTemplateForm from '../smart/ExercisesTemplateForm'
import store from './store'

function readCookie(name) {
  console.log('reading cookie')
  name += '='
  for (let ca = document.cookie.split(/;\s*/), index = ca.length - 1; index >= 0; index--) {
    if (!ca[index].indexOf(name)) {
      return ca[index].replace(name, '')
    }
  }
}

function requireAuth(nextState, replaceState) {
  /* global __DEV__ */
  if (store.getState().user.get('isLoggedIn') || readCookie('userid')) {
    return
  } else {
    console.log('rediricting')
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

    <Route path='reports/clients' component={ClientReportsList} onEnter={requireAuth} />
    <Route path='reports/clients/:id' component={ClientReport} onEnter={requireAuth} />

    <Route path='templates/clients' component={ClientsTemplatesList} onEnter={requireAuth}/>
    <Route path='templates/clients/new' component={ClientsTemplateForm} onEnter={requireAuth}/>
    <Route path='templates/clients/:id' component={ClientsTemplateForm} onEnter={requireAuth} />

    <Route path='templates/exercises' component={ExercisesTemplatesList} onEnter={requireAuth}/>
    <Route path='templates/exercises/new' component={ExercisesTemplateForm} onEnter={requireAuth}/>
    <Route path='templates/exercises/:id' component={ExercisesTemplateForm} onEnter={requireAuth} />
  </Route>
)

export default routes
