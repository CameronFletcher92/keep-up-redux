'use strict'
const express = require('express')
const webpack = require('webpack')
const config = require('../config/webpack.dev.config')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const compiler = webpack(config)

// enable hotloading for dev server in development environment
if (process.env.NODE_ENV === 'development') {
  console.log('Enabling hotloading and injecting redux dev tools')
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

// require the routes
require('./routes/faker')(app)
require('./routes/static')(app)

// listen on port 3000
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
