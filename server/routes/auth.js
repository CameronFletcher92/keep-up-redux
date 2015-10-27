'use strict'
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = (app, passport) => {
  // API Access link for creating client ID and secret:
  const GOOGLE_CLIENT_ID = '605515633008-gnqeu680g02spr6fbv8asal8assgd353.apps.googleusercontent.com'
  const GOOGLE_CLIENT_SECRET = 'mhrncAcTi_cWAYo7etNT2YDg'

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
      console.log('google user signed in, id: ', profile.id)

      // find existing user in the db by their google id
      const query = User.findOne({ googleId: profile.id })
      query.exec((err, existingUser) => {
        if (err) {
          console.error(err)
        }

        if (existingUser !== null) {
          // log in existing user
          return done(null, existingUser)
        } else {
          // create new user from google profile information
          const newUser = {
            _id: null,
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          }

          User.create(newUser, (err2, createdUser) => {
            if (err2) {
              console.error('could not create user', err2)
            }
            return done(null, createdUser)
          })
        }
      })
    })
  )
}
