import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { AppBar, LeftNav } from '../themes/muiComponents'
import { pushState } from 'redux-router'

const styles = {
  appbar: { position: 'fixed' },
  container: { display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '4em' },
  content: { display: 'flex', flex: '1', flexDirection: 'column', minWidth: '15em', maxWidth: '50em', margin: '0.5em' }
}

class TopBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  toggleMenu() {
    this.refs.leftNav.toggle()
  }

  render() {
    const props = this.props
    const menuItems = [
      { route: '/clients', text: 'Clients' },
      { route: '/exercises', text: 'Exercises' },
      { route: '/sessions', text: 'Sessions' },
      { route: '/reports', text: 'Reports' }
    ]

    return (
      <div>
        <AppBar style={styles.appbar} title={props.title} zDepth={1} onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}/>
        <LeftNav ref='leftNav' menuItems={menuItems} docked={false}
                 onChange={(ev, key, payload) => props.pushState({ title: payload.text }, payload.route)}/>
        <div style={styles.container}>
          <div style={styles.content}>
            {props.children}
          </div>
        </div>
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
