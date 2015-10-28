import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { RaisedButton, FontIcon } from '../themes/muiComponents'
import { fetchAsync } from '../ducks/user'
import CenteredSpinner from '../dumb/CenteredSpinner'
import Flex from '../dumb/Flex'

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
    /* global __CORDOVA__ */
    if (props.isLoggedIn) {
      return (
        <Flex direction='column' alignItems='center'>
          <p>Logged in as {props.user.get('firstName')} {props.user.get('lastName')} </p>
          {__CORDOVA__ ?
            <RaisedButton label='Logout' primary={true} linkButton={true} onClick={() => window.location = 'http://keep-up-app.herokuapp.com/api/logout'}/>
          :
            <RaisedButton label='Logout' primary={true} linkButton={true} href='/api/logout'/>}
        </Flex>
      )
    } else if (!props.isFetching) {
      return (
        __CORDOVA__ ?
          <RaisedButton label='Login' primary={true} linkButton={true} onClick={() => window.location = 'http://keep-up-app.herokuapp.com/api/login'}/>
        :
          <RaisedButton label='Login' primary={true} linkButton={true} href='/api/login'/>
      )
    }
  }

  render() {
    const props = this.props
    return (
      <Flex direction='column' alignItems='center'>
        <h1>Welcome to Keep Up!</h1>
        <FontIcon className='material-icons' style={{ fontSize: '1000%' }}>face</FontIcon>
        <CenteredSpinner isVisible={props.isFetching}/>
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
