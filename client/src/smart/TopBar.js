import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { navToCreateClient, navToViewClients } from '../ducks/clients'

class TopBar extends Component {
  render() {
    const { url, navToView, navToCreate } = this.props

    return (
      <div>
        <Navbar fixedTop={true} fluid={true} toggleNavKey={0}>
          <NavBrand><a onClick={() => navToViewClients()}>Keep Up</a></NavBrand>
          <Nav eventKey={0}>
            <NavDropdown id='1' title='Clients' active={true}>
              <MenuItem onSelect={() => navToViewClients()}>View Clients</MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => navToCreateClient()}>New Client</MenuItem>
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
  navToCreate: PropTypes.func.isRequired,
  navToView: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      url: state.router.location.pathname
    }
  },
  dispatch => {
    return bindActionCreators({ navToCreateClient, navToViewClients }, dispatch)
  }
)(TopBar)
