import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from './util/shouldUpdatePure'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import store from './util/store'
import routes from './util/routes'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { ThemeManager } from './themes/muiComponents'
import muiTheme from './themes/muiTheme'

class App extends Component {
  shouldComponentUpdate = shouldUpdatePure

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiTheme)
    }
  }

  renderDevTools() {
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    )
  }

  render() {
    /* global __DEV__ */
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter routes={routes} />
        </Provider>
        {__DEV__ ? this.renderDevTools() : null}
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default App
