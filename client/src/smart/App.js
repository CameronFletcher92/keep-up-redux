import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { navToCreate, navToView } from '../ducks/clients'

import ClientsList from './ClientsList'

class App extends Component {
  render() {
    const { dispatch, url } = this.props
    
    return (
      <Grid fluid={true}>
        <Navbar brand='Keep Up' fluid={true} fixedTop={true} inverse={true}>
          <Nav>
            <NavDropdown title='Clients' active={url == '/clients' ? true : false}>
              <MenuItem eventKey='1' onSelect={() => dispatch(navToView())}>View Clients</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='2' onSelect={() => dispatch(navToCreate())}>New Client</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div style={{marginTop: '4em'}}>
          {this.props.children}
        </div>
      </Grid>
    )
  }
}

App.PropTypes = {
  url: PropTypes.string.isRequired
}

// map the current url to the props
function select(state) {
  return { url: state.router.location.pathname }
}

export default connect(select)(App)
