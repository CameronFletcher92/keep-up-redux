import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid } from 'react-bootstrap'
import { navToCreate, navToView } from '../ducks/clients'

class TopBar extends Component {
  render() {
    const { url, navToView, navToCreate } = this.props

    return (
      <Grid fluid={true}>
        <Navbar fixedTop={true} fluid={true} toggleNavKey={0}>
          <Nav eventKey={0}>
            <NavDropdown id='1' title='Clients' active={url == '/clients' ? true : false}>
              <MenuItem onSelect={() => navToView()}>View Clients</MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => navToCreate()}>New Client</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div style={{marginTop: '4.5em'}}>
          {this.props.children}
        </div>
      </Grid>
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
    return bindActionCreators({ navToCreate, navToView }, dispatch)
  }
)(TopBar)
