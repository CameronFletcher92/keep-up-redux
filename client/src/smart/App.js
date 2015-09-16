import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { pushState } from 'redux-react-router'
import ClientsList from './ClientsList'
import Counter from './Counter'

class App extends Component {
  render() {
    const { dispatch, url } = this.props
    console.log('url', url)

    return (
      <div>
        <Navbar brand='Keep Up' fluid={true} fixedTop={true} inverse={true}>
          <Nav>
            <NavItem active={url == '/clients' ? true : false}
                     onSelect={() => dispatch(pushState(null, '/clients'))}>Clients</NavItem>
            <NavItem active={url == '/counter' ? true : false}
                     onSelect={() => dispatch(pushState(null, '/counter'))}>Counter</NavItem>
          </Nav>
        </Navbar>
        <div style={{marginTop: '4em'}}>
          {this.props.children}
        </div>
      </div>
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
