import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ClientsList from './ClientsList'
import Counter from './Counter'
import { pushState } from 'redux-react-router'

class App extends Component {
  render() {
    const { dispatch } = this.props

    return (
      <div>
        <Navbar brand='Keep Up' fluid={true} fixedTop={true} inverse={true}>
          <Nav>
            <NavItem eventKey={1} onSelect={() => dispatch(pushState(null, '/clients'))}>Clients</NavItem>
            <NavItem eventKey={2} onSelect={() => dispatch(pushState(null, '/counter'))}>Counter</NavItem>
          </Nav>
        </Navbar>
        <div style={{marginTop: '4em'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function select(state) {
  return {...state.router}
}

export default connect(select)(App)
