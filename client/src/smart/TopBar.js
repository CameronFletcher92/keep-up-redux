import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { navToCreateClient, navToViewClients } from '../ducks/clients'
import { navToCreateExercise, navToViewExercises } from '../ducks/exercises'
import { navToCreateSession, navToViewSessions } from '../ducks/sessions'

class TopBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const {
      url, navToViewClients, navToCreateClient,
      navToViewExercises, navToCreateExercise,
      navToViewSessions, navToCreateSession
    } = this.props

    return (
      <div>
        <Navbar fixedTop={true} fluid={true} toggleNavKey={0}>
          <NavBrand><a onClick={() => navToViewClients()}>Keep Up</a></NavBrand>
          <Nav eventKey={0}>
            <NavDropdown id='1' title='Clients'>
              <MenuItem onSelect={() => navToViewClients()}>View Clients</MenuItem>
              <MenuItem onSelect={() => navToCreateClient()}>New Client</MenuItem>
            </NavDropdown>
            <NavDropdown id='2' title='Exercises'>
              <MenuItem onSelect={() => navToViewExercises()}>View Exercises</MenuItem>
              <MenuItem onSelect={() => navToCreateExercise()}>New Exercise</MenuItem>
            </NavDropdown>
            <NavDropdown id='2' title='Sessions'>
              <MenuItem onSelect={() => navToViewSessions()}>View Sessions</MenuItem>
              <MenuItem onSelect={() => navToCreateSession()}>New Session</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div style={{marginTop: '4.5em'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

TopBar.PropTypes = {
  url: PropTypes.string.isRequired,
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
