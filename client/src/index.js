import React from 'react'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './ducks'
import App from './smart/App'
import { Grid, Col } from 'react-bootstrap'

// if in development mode, render with dev tools
if (__DEV__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
  const { devTools } = require('redux-devtools')

  const finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools()
  )(createStore)

  const store = finalCreateStore(rootReducer)

  React.render(
    <Grid fluid={true}>
      <Col sm={8}>
        <Provider store={store}>
          {() => <App />}
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
  const finalCreateStore = compose(
    applyMiddleware(thunk),
  )(createStore)

  const store = finalCreateStore(rootReducer)

  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.getElementById('root')
  )
}
