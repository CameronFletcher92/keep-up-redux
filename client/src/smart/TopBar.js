import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import { AppBar, LeftNav } from 'material-ui'
import { navToCreateClient, navToViewClients } from '../ducks/clients'
import { navToCreateExercise, navToViewExercises } from '../ducks/exercises'
import { navToCreateSession, navToViewSessions } from '../ducks/sessions'

class TopBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  menuNavigate(e, key, payload) {
    const {
      navToViewClients, navToCreateClient,
      navToViewExercises, navToCreateExercise,
      navToViewSessions, navToCreateSession,
    } = this.props

    switch(payload.route) {
      case '/clients':
        navToViewClients()
        break
      case '/clients/new':
        navToCreateClient()
        break
      case '/exercises':
        navToViewExercises()
        break
      case '/exercises/new':
        navToCreateExercise()
        break
      case '/sessions':
        navToViewSessions()
        break
      case '/sessions/new':
        navToCreateSession()
        break
    }
  }

  toggleMenu() {
    this.refs.leftNav.toggle()
  }

  render() {
    const menuItems = [
      {route: '/clients', text: 'View Clients'},
      {route: '/clients/new', text: 'New Client'},
      {route: '/exercises', text: 'View Exercises'},
      {route: '/exercises/new', text: 'New Exercise'},
      {route: '/sessions', text: 'View Sessions'},
      {route: '/sessions/new', text: 'New Session'},
    ]

    const { children } = this.props

    return (
      <div>
        <AppBar style={{position: 'fixed'}} title='Keep Up' zDepth={1} onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}/>
        <LeftNav ref='leftNav' menuItems={menuItems} docked={false} onChange={this.menuNavigate.bind(this)}/>
        <div style={{paddingTop: '4.5em', display: 'flex', justifyContent: 'center', alignItems: 'stretch'}}>
          <div style={{flex: '1', display: 'flex', minWidth: '15em', maxWidth: '50em', flexDirection: 'column'}}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

TopBar.PropTypes = {
  navToCreateClient: PropTypes.func.isRequired,
  navToViewClients: PropTypes.func.isRequired,
  navToCreateExercise: PropTypes.func.isRequired,
  navToViewExercises: PropTypes.func.isRequired,
  navToCreateSession: PropTypes.func.isRequired,
  navToViewSessions: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {}
  },
  dispatch => {
    return bindActionCreators({
      navToCreateClient, navToViewClients,
      navToCreateExercise, navToViewExercises,
      navToCreateSession, navToViewSessions,
    }, dispatch)
  }
)(TopBar)
