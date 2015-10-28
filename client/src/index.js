import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import injectTap from 'react-tap-event-plugin'

// inject touch tap plugin
injectTap()

// render the root
ReactDOM.render(<App />, document.getElementById('root'))

// window rotation on phones always
window.shouldRotateToOrientation = () => {
  return true
}
