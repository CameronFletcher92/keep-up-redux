'use strict'
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = (app, passport) => {
  // API Access link for creating client ID and secret:
  const GOOGLE_CLIENT_ID = '605515633008-d9knijfcqub8ecg87ff0jhmrf2hqolo9.apps.googleusercontent.com'
  const GOOGLE_CLIENT_SECRET = 'egzwUYDNLBEEgv-UXuWy4pn6'

  // Passport google strategy setup
  passport.use(new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/login/callback'
    },

    // when authenticating from middleware, get the user from the db
    // or create a new one to pass into the response
    (accessToken, refreshToken, profile, done) => {
      // find existing user in the db by their google id
      const query = User.findOne({ googleId: profile.id })
      query.exec((err, existingUser) => {
        if (err) {
          console.error(err)
        }

        if (existingUser !== null) {
          console.log('user account fetched', existingUser)
          // log in existing user
          return done(null, existingUser)
        } else {
          // create new user from google profile information
          const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          }

          User.create(newUser, (err2, createdUser) => {
            if (err2) {
              console.error('could not create user', err2)
            }
            console.log('user account created', createdUser)
            return done(null, createdUser)
          })
        }
      })
    })
  )
}
