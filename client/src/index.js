import React from 'react'
import { Provider } from 'react-redux'
import { Grid, Col } from 'react-bootstrap'
import { ReduxRouter } from 'redux-react-router'
import App from './smart/App'
import store from './store'

// if in development mode, render with dev tools
if (__DEV__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
  React.render(
    <Grid fluid={true}>
      <Col sm={8}>
        <Provider store={store}>
          {() => <ReduxRouter />}
        </Provider>
      </Col>
      <Col sm={4}>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </Col>
    </Grid>,
    document.getElementById('root')
  )
}

// otherwise just render the redux app
else {
  React.render(
    <Provider store={store}>
      {() => <ReduxRouter />}
    </Provider>,
    document.getElementById('root')
  )
}
