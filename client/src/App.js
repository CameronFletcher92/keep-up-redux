import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import shouldUpdatePure from 'react-pure-render/function'
import store from './store'
import routes from './routes'
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

  componentDidUpdate() {
    console.log('Rendering App')
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
