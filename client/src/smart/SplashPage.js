import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { RaisedButton, FontIcon } from 'material-ui'
import { fetchAsync } from '../ducks/user'
import CenteredSpinner from '../dumb/CenteredSpinner'
import Flex from '../dumb/Flex'

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
    const { isLoggedIn, isFetching, user } = this.props
    if (isLoggedIn) {
      return (
        <p>Logged in as {user.get('firstName')} {user.get('lastName')} </p>
      )
    } else if (!isFetching) {
      return (
        <RaisedButton label='Login' primary={true} linkButton={true} onClick={this.loginClicked} href='/api/login'/>
      )
    }
  }

  render() {
    const { isFetching } = this.props
    return (
      <Flex direction='column' alignItems='center'>
        <h1>Welcome to Keep Up!</h1>
        <FontIcon className='material-icons' style={{ fontSize: '1000%' }}>face</FontIcon>
        <CenteredSpinner isVisible={isFetching}/>
        {this.renderContent()}
      </Flex>
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
