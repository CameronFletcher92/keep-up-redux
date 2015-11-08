import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { hideMessage } from '../ducks/global'
import { AppBar, LeftNav, Snackbar, MenuItem } from '../themes/muiComponents'
import { pushState } from 'redux-router'
import { palette } from '../themes/muiTheme'

const styles = {
  appbar: { position: 'fixed' },
  container: { display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '4em' },
  header: { background: palette.primary1Color, color: palette.alternateTextColor,
            paddingTop: '0.7em', paddingBottom: '0.8em', paddingLeft: '1em', fontSize: '24px' },
  content: { display: 'flex', flex: '1', flexDirection: 'column', minWidth: '15em', maxWidth: '50em', margin: '0.5em' }
}

class TopBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  toggleMenu() {
    this.refs.leftNav.toggle()
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props
    if (props.message === '' && nextProps.message !== '') {
      this.refs.snack.show()
    } else if (props.message === '') {
      this.refs.snack.dismiss()
    }
  }

  navHome() {
    const props = this.props
    props.pushState(null, '/')
    this.refs.leftNav.close()
  }

  renderHeader() {
    return (
      <div style={styles.header}>
        Keep Up
      </div>
    )
  }

  render() {
    const menuItems = [
      { route: '/clients', text: 'Clients' },
      { route: '/exercises', text: 'Exercises' },
      { route: '/sessions', text: 'Sessions' },
      { type: MenuItem.Types.SUBHEADER, text: 'Templates' },
      { route: '/templates/clients', text: 'Clients Templates' },
      { route: '/templates/exercises', text: 'Exercises Templates' },
      { type: MenuItem.Types.SUBHEADER, text: 'Reports' },
      { route: '/reports/clients', text: 'Client Reports' }
    ]

    const props = this.props
    return (
      <div>
        <AppBar style={styles.appbar} title={props.title} zDepth={1}
                onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}/>
        <LeftNav ref='leftNav' menuItems={menuItems} docked={false} header={this.renderHeader()}
                 onChange={(ev, key, payload) => props.pushState({ title: payload.text }, payload.route)}/>
        <div style={styles.container}>
          <div style={styles.content}>
            {props.children}
          </div>
        </div>
        <Snackbar message={props.message} ref='snack' onDismiss={() => props.hideMessage()} autoHideDuration={2000}/>
      </div>
    )
  }
}

TopBar.PropTypes = {
  pushState: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default connect(
  state => {
    const routerState = state.router.location.state
    return {
      title: routerState ? routerState.title : 'Keep Up',
      message: state.global.get('message')
    }
  },
  dispatch => {
    return bindActionCreators({ pushState, hideMessage }, dispatch)
  }
)(TopBar)
