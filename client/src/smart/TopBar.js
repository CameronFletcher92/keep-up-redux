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

  onMenuChange(menuItem) {
    menuItem.action()
  }

  render() {
    const {
      navToViewClients, navToCreateClient,
      navToViewExercises, navToCreateExercise,
      navToViewSessions, navToCreateSession
    } = this.props

    const menuItems = [
      { text: 'View Clients', action: () => navToViewClients() },
      { text: 'New Client', action: () => navToCreateClient() },

      { text: 'View Exercises', action: () => navToViewExercises() },
      { text: 'New Exercise', action: () => navToCreateExercise() },

      { text: 'View Sessions', action: () => navToViewSessions() },
      { text: 'New Session', action: () => navToCreateSession() },
    ]

    return (
      <div>
        <AppBar title='Keep Up' style={{position: 'fixed'}} showMenuIconButton
                onLeftIconButtonTouchTap={() => this.refs.menu.toggle()} />
        <LeftNav menuItems={menuItems} docked={false} ref='menu'
                 onChange={(e, s, item) => this.onMenuChange(item)}/>
        <div style={{paddingTop: '5em'}}>
          {this.props.children}
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
