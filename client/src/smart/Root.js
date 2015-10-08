import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Grid, Col } from 'react-bootstrap'
import { ReduxRouter } from 'redux-react-router'
import store from '../store'

class Root extends Component {
  renderDev() {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    return (
      <Grid fluid={true}>
        <Col sm={8}>
          <Provider store={store}>
            <ReduxRouter />
          </Provider>
        </Col>
        <Col sm={4}>
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        </Col>
      </Grid>
    )
  }

  renderProd() {
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    )
  }

  render() {
    if (__DEV__) {
      return this.renderDev()
    } else {
      return this.renderProd()
    }
  }
}

export default Root
