import React from 'react'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './ducks'
import App from './smart/App'
import { Grid, Col } from 'react-bootstrap'
import routes from './routes'
import { ReduxRouter } from 'redux-react-router'

// if in development mode, render with dev tools
if (__DEV__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
  const { devTools } = require('redux-devtools')

  const store = compose(
    applyMiddleware(thunk),
    routes,
    devTools()
  )(createStore)(rootReducer)

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
  const store = compose(
    applyMiddleware(thunk),
    routes
  )(createStore)(rootReducer)

  React.render(
    <Provider store={store}>
      {() => <ReduxRouter />}
    </Provider>,
    document.getElementById('root')
  )
}
