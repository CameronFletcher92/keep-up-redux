import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from 'react-pure-render/function'
import { Jumbotron, Button, ProgressBar } from 'react-bootstrap'
import { fetchAsync } from '../ducks/user'

class SplashPage extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const {fetchAsync, isLoggedIn} = this.props
    if (!isLoggedIn) {
      fetchAsync()
    }
  }

  loginClicked() {
    console.log('login')
  }

  renderContent() {
    const {isFetching, isLoggedIn, user} = this.props

    if (isFetching) {
      return (
        <ProgressBar active bsStyle='success' now={100}/>
      )
    }

    if (isLoggedIn) {
      return (
        <p> Logged in as {user.get('firstName')} {user.get('lastName')} </p>
      )
    } else {
      return (
        <Button onClick={this.loginClicked} bsStyle='primary'>Login</Button>
      )
    }
  }

  render() {
    return (
      <Jumbotron>
        <h2>Welcome to Keep Up!</h2>
        <p>Keep Up is an application designed to help personal trainers / health professionals with tracking their clients</p>

        {this.renderContent()}
      </Jumbotron>
    )
  }
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
