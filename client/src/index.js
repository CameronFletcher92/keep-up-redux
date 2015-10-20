import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import injectTap from 'react-tap-event-plugin'

// inject touch tap plugin
injectTap()

// render the root
ReactDOM.render(<App />, document.getElementById('root'))

if (!__DEV__) {
  window.onbeforeunload = () => 'Keep-Up will have to re-fetch data if you leave this page.'
}
