import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { fetchAsync } from '../ducks/user'
import CenteredSpinner from '../dumb/CenteredSpinner'
import { RaisedButton } from 'material-ui'

class SplashPage extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { fetchAsync, isLoggedIn } = this.props
    if (!isLoggedIn) {
      fetchAsync()
    }
  }

  loginClicked() {
    // console.log('login')
  }

  renderContent() {
    const { isFetching, isLoggedIn, user } = this.props

    if (isFetching) {
      return (
        <CenteredSpinner isVisible={isFetching} />
      )
    }

    if (isLoggedIn) {
      return (
        <p> Logged in as {user.get('firstName')} {user.get('lastName')} </p>
      )
    } else if (!isLoggedIn) {
      return (
        <RaisedButton onClick={this.loginClicked} label='Login'/>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to Keep Up!</h2>
        <p>Keep Up is an application designed to help personal trainers / health professionals with tracking their clients</p>

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
