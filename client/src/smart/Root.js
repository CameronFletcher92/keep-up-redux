import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Grid, Col } from 'react-bootstrap'
import { ReduxRouter } from 'redux-react-router'
import store from '../store'

class Root extends Component {
  renderDev() {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
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
    let content
    if (__DEV__) {
      content = this.renderDev()
    } else {
      content = this.renderProd()
    }

    return (
      <Grid fluid style={{'paddingLeft': '0.5em', 'paddingRight': '0.5em'}}>
        <Col xs={12} sm={10} md={8} lg={6} smOffset={1} style={{'padding': 0}}>
          {content}
        </Col>
      </Grid>
    )
  }
}

export default Root
