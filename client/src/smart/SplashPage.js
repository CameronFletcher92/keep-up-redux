import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { RaisedButton, FontIcon } from '../themes/muiComponents'
import { fetchAsync } from '../ducks/user'
import CenteredSpinner from '../dumb/CenteredSpinner'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  content: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  icon: { fontSize: '1000%' }
}

class SplashPage extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props
    if (!props.isLoggedIn) {
      props.fetchAsync()
    }
  }

  renderContent() {
    const props = this.props
    if (props.isLoggedIn) {
      return (
        <div style={styles.content}>
          <p>Logged in as {props.user.get('firstName')} {props.user.get('lastName')} </p>
          <RaisedButton label='Logout' primary={true} linkButton={true} href='/api/logout'/>
        </div>
      )
    } else if (!props.isFetching) {
      return (
        <RaisedButton label='Login' primary={true} linkButton={true} href='/api/login'/>
      )
    }
  }

  render() {
    const props = this.props
    return (
      <div style={styles.container}>
        <h1>Welcome to Keep Up!</h1>
        <FontIcon className='material-icons' style={styles.icon}>face</FontIcon>
        <CenteredSpinner isVisible={props.isFetching}/>
        {this.renderContent()}
      </div>
    )
  }
}

SplashPage.propTypes = {
  fetchAsync: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: ImmPropTypes.map.isRequired
}

export default connect(
  state => {
    return {
      isLoggedIn: state.user.get('isLoggedIn'),
      user: state.user.get('entity'),
      isFetching: state.user.get('isFetching')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync }, dispatch)
  }
)(SplashPage)
