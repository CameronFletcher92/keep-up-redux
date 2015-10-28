'use strict'
const express = require('express')
const webpack = require('webpack')
const config = require('../config/webpack.dev.config')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')

// Passport session setup.
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

// express setup
const app = express()
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// compiler and hotloader setup
const compiler = webpack(config)
if (process.env.NODE_ENV === 'development') {
  console.log('Enabling hotloading and injecting redux dev tools')
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

// Connect Database
const uri = app.settings.env === 'production' && process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI
                                              : 'mongodb://localhost/keep-up'
console.log('mongo uri: ' + uri)

mongoose.connect(uri)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

// require the routes
/* global __DEV__ */
if (app.settings.env !== 'production') require('./routes/faker')(app)
require('./routes/auth')(app, passport)
require('./routes/api')(app, passport)
require('./routes/static')(app)

// listen on port 3000
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
