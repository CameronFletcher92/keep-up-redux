'use strict'
const Client = require('../models/client')
const Exercise = require('../models/exercise')
const Session = require('../models/session')

module.exports = (app, passport) => {
  /*
   *  USER
   */
  // call to authenticate with google
  app.get('/api/login',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }),
    () => {
      // do nothing (never called)
    }
  )

  /*
   * REPORTS
   */

  // fetch a client's report
  app.get('/api/reports/:id', (req, res) => {
    if (req.isAuthenticated()) {
      const id = req.params.id
      console.log('GET /api/reports/' + id)

      const resSessions = []
      const resExercises = {}
      let name = ''

      // determine the clients name
      let query = Client.find({ _id: id })
      query.findOne((err, client) => {
        name = client.firstName + ' ' + client.lastName

        // fetch the sessions with the client and populate result
        query = Session.find({ trainer: req.user._id, clients: id })
        query.find((err, sessions) => {
          sessions.forEach(session => {
            resSessions.push(session._id)
            session.exercises.forEach(exerciseId => {
              if (resExercises[exerciseId]) {
                resExercises[exerciseId] = resExercises[exerciseId] + 1
              } else {
                resExercises[exerciseId] = 1
              }
            })
          })

          // construct the result
          const result = {
            name,
            sessions: resSessions,
            exercises: resExercises
          }

          res.json(result)
        })
      })
    }
  })

  // callback from google authentication
  app.get('/api/login/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('GET /api/login/callback')
      res.redirect('/')
    }
  )

  // get the current user
  app.get('/api/user', (req, res) => {
    console.log('GET /api/user')
    if (req.isAuthenticated()) {
      res.json(req.user)
    } else {
      res.json(null)
    }
  })

  // log out the current user
  app.get('/api/logout', (req, res) => {
    console.log('GET /api/logout')
    if (req.isAuthenticated()) {
      req.logout()
      res.redirect('/')
    }
  })

  /*
   *  CLIENTS
   */

  // create a new client
  app.post('/api/clients', (req, res) => {
    console.log('POST /api/clients')
    if (req.isAuthenticated()) {
      const client = req.body
      delete client._id

      console.log('setting trainer as', req.user)
      client.trainer = req.user._id

      Client.create(client, (err, newClient) => {
        if (err || !newClient) {
          console.error(err)
          console.error('could not create client')
        } else {
          console.log('new client', newClient)
          res.json(newClient)
        }
      })
    }
  })

  // update a client
  app.put('/api/clients', (req, res) => {
    console.log('PUT /api/clients')
    if (req.isAuthenticated()) {
      const client = req.body
      const query = Client.find({ _id: client._id })

      console.log('setting trainer as', req.user)
      client.trainer = req.user._id

      Client.findOneAndUpdate(query, client, (err, updatedClient) => {
        if (err || !updatedClient) {
          console.error('could not update client')
        } else {
          res.json(client)
        }
      })
    }
  })

  // fetch the clients
  app.get('/api/clients', (req, res) => {
    console.log('GET /api/clients')
    // get clients for user based off the authenticated user's id
    const query = Client.find({ trainer: req.user._id }).sort({ lastName: 1 })
    query.exec((err, clients) => {
      if (err || !clients) {
        console.error('could not fetch clients')
      } else {
        res.json(clients)
      }
    })
  })

  /*
   *  EXERCISES
   */

  // create a new exercise
  app.post('/api/exercises', (req, res) => {
    console.log('POST /api/exercises')
    if (req.isAuthenticated()) {
      const exercise = req.body
      delete exercise._id

      console.log('setting trainer as', req.user)
      exercise.trainer = req.user._id

      Exercise.create(exercise, (err, newExercise) => {
        if (err || !newExercise) {
          console.error('could not create exercise')
        } else {
          res.json(newExercise)
        }
      })
    }
  })

  // update a exercise
  app.put('/api/exercises', (req, res) => {
    console.log('PUT /api/exercises')
    if (req.isAuthenticated()) {
      const exercise = req.body

      console.log('setting trainer as', req.user)
      exercise.trainer = req.user._id

      const query = Exercise.find({ _id: exercise._id })
      Exercise.findOneAndUpdate(query, exercise, (err, updatedExercise) => {
        if (err || !updatedExercise) {
          console.error('could not update exercise')
        } else {
          res.json(exercise)
        }
      })
    }
  })

  // fetch the exercises
  app.get('/api/exercises', (req, res) => {
    console.log('GET /api/exercises')
    // get exercises for user based off the authenticated user's id
    const query = Exercise.find({ trainer: req.user._id }).sort({ name: 1 })
    query.exec((err, exercises) => {
      if (err || !exercises) {
        console.error('could not fetch exercises')
      } else {
        res.json(exercises)
      }
    })
  })

  /*
   *  SESSIONS
   */
  // create a new session
  app.post('/api/sessions', (req, res) => {
    console.log('POST /api/sessions')
    if (req.isAuthenticated()) {
      const session = req.body
      delete session._id

      console.log('setting trainer as', req.user)
      session.trainer = req.user._id

      Session.create(session, (err, newSession) => {
        if (err || !newSession) {
          console.error('could not create session')
        } else {
          res.json(newSession)
        }
      })
    }
  })

  // update a session
  app.put('/api/sessions', (req, res) => {
    console.log('PUT /api/sessions')
    if (req.isAuthenticated()) {
      const session = req.body

      console.log('setting trainer as', req.user)
      session.trainer = req.user._id

      const query = Session.find({ _id: session._id })
      Session.findOneAndUpdate(query, session, (err, updatedSession) => {
        if (err || !updatedSession) {
          console.error('could not update session')
        } else {
          res.json(session)
        }
      })
    }
  })

  // fetch the sessions
  app.get('/api/sessions', (req, res) => {
    console.log('GET /api/sessions')
    // get sessions for user based off the authenticated user's id
    const query = Session.find({ trainer: req.user._id }).sort({ name: 1 })
    query.exec((err, sessions) => {
      if (err || !sessions) {
        console.error('could not fetch sessions')
      } else {
        res.json(sessions)
      }
    })
  })
}
