import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { navToCreateClient, navToViewClients } from '../ducks/clients'
import { navToCreateExercise, navToViewExercises } from '../ducks/exercises'

class TopBar extends Component {
  render() {
    const { url, navToViewClients, navToCreateClient, navToCreateExercise, navToViewExercises } = this.props

    return (
      <div>
        <Navbar fixedTop={true} fluid={true} toggleNavKey={0}>
          <NavBrand><a onClick={() => navToViewClients()}>Keep Up</a></NavBrand>
          <Nav eventKey={0}>
            <NavDropdown id='1' title='Clients'>
              <MenuItem onSelect={() => navToViewClients()}>View Clients</MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => navToCreateClient()}>New Client</MenuItem>
            </NavDropdown>
            <NavDropdown id='2' title='Exercises'>
              <MenuItem onSelect={() => navToViewExercises()}>View Exercises</MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => navToCreateExercise()}>New Exercise</MenuItem>
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
}

export default connect(
  state => {
    return {}
  },
  dispatch => {
    return bindActionCreators({ navToCreateClient, navToViewClients, navToCreateExercise, navToViewExercises }, dispatch)
  }
)(TopBar)
