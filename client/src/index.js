import React from 'react'
//import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from './smart/Root'
import injectTap from 'react-tap-event-plugin'

// inject touch tap plugin
injectTap()

// render the root
React.render(<Root />, document.getElementById('root'))
