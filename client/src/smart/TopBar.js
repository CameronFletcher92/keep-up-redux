import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import { AppBar, LeftNav } from 'material-ui'
import { pushState } from 'redux-router'
import Flex from '../dumb/Flex'

class TopBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  toggleMenu() {
    this.refs.leftNav.toggle()
  }

  render() {
    const menuItems = [
      { route: '/clients', text: 'Clients' },
      { route: '/exercises', text: 'Exercises' },
      { route: '/sessions', text: 'Sessions' }
    ]

    const { children, pushState, title } = this.props

    return (
      <div>
        <AppBar style={{ position: 'fixed' }} title={title} zDepth={1} onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}/>
        <LeftNav ref='leftNav' menuItems={menuItems} docked={false} onChange={(ev, key, payload) => pushState({ title: payload.text }, payload.route)}/>
        <div style={{ paddingTop: '4.0em' }}/>
        <Flex direction='row' justifyContent='center'>
          <Flex minWidth='15em' maxWidth='50em' direction='column' margin='0.5em'>
            {children}
          </Flex>
        </Flex>
      </div>
    )
  }
}

TopBar.PropTypes = {
  pushState: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default connect(
  state => {
    const routerState = state.router.location.state
    return {
      title: routerState ? routerState.title : 'Keep Up'
    }
  },
  dispatch => {
    return bindActionCreators({ pushState }, dispatch)
  }
)(TopBar)
