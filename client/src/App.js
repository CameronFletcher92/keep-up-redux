import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import shouldUpdatePure from 'react-pure-render/function'
import store from './store'
import routes from './routes'
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

class App extends Component {
  shouldComponentUpdate = shouldUpdatePure

  /*
  renderDevTools() {
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>

    )
  }
  */

  render() {
    /* global __DEV__ */
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter routes={routes} />
        </Provider>
        {/* __DEV__ ? this.renderDevTools() : null */}
      </div>
    )
  }
}

export default App
