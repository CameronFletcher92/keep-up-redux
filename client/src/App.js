import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from './util/shouldUpdatePure'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import store from './util/store'
import routes from './util/routes'
import DevTools from './smart/DevTools'
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
      <DevTools />
    )
  }

  render() {
    /* global __DEV__ */
    return (
      <div>
        <Provider store={store}>
          <div>
            {__DEV__ ? this.renderDevTools() : null}
            <ReduxRouter routes={routes} />
          </div>
        </Provider>
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default App
