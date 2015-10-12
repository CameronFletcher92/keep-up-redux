import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-react-router'
import shouldUpdatePure from 'react-pure-render/function'
import store from '../store'

class Root extends Component {
  shouldComponentUpdate = shouldUpdatePure

  renderDev() {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    return (
      <div>
        <Provider store={store}>
          {() => <ReduxRouter />}
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
        {() => <ReduxRouter />}
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
      <div>
        {content}
      </div>
    )
  }
}

export default Root
