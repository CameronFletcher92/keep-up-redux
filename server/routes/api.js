'use strict'
const Client = require('../models/client')
const Exercise = require('../models/exercise')
const Session = require('../models/session')
const ClientsTemplate = require('../models/clientsTemplate')
const ExercisesTemplate = require('../models/exercisesTemplate')

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

  // callback from google authentication
  app.get('/api/login/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('GET /api/login/callback')
      res.redirect('/')
    }
  )

  // log out the current user
  app.get('/api/logout', (req, res) => {
    console.log('GET /api/logout')
    if (req.isAuthenticated() && req.user) {
      req.logout()
      res.clearCookie('userid')
      res.redirect('/')
    }
  })

  /*
   * REPORTS
   */

  // fetch a client's report
  app.get('/api/reports/clients/:id', (req, res) => {
    if (req.isAuthenticated() && req.user) {
      const id = req.params.id
      const min = req.query.min ? new Date(req.query.min) : new Date(-8640000000000000)
      const max = req.query.max ? new Date(req.query.max) : new Date(8640000000000000)
      console.log('GET /api/reports/clients/' + id, ' min = ' + min + ' max = ' + max)

      // construct a result object
      const resSessions = []
      const resExercises = {}
      let name = ''

      // determine the clients name
      let query = Client.find({ _id: id })
      query.findOne((err, client) => {
        name = client.firstName + ' ' + client.lastName

        // fetch the sessions with the client and populate the result
        query = Session.find({ trainer: req.user._id, time: { '$gte': min, '$lte': max }, clients: id })
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

  // get the current user
  app.get('/api/user', (req, res) => {
    console.log('GET /api/user')
    if (req.isAuthenticated() && req.user) {
      res.json(req.user)
    } else {
      res.json(null)
    }
  })

  /*
   *  CLIENTS
   */

  // create a new client
  app.post('/api/clients', (req, res) => {
    console.log('POST /api/clients')
    if (req.isAuthenticated() && req.user) {
      const client = req.body
      delete client._id
      client.trainer = req.user._id

      Client.create(client, (err, newClient) => {
        if (err || !newClient) {
          console.error(err)
        } else {
          res.json(newClient)
        }
      })
    }
  })

  // update a client
  app.put('/api/clients', (req, res) => {
    console.log('PUT /api/clients')
    if (req.isAuthenticated() && req.user) {
      const client = req.body
      const query = Client.find({ _id: client._id })
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
    if (req.isAuthenticated() && req.user) {
      // get clients for user based off the authenticated user's id
      const query = Client.find({ trainer: req.user._id }).sort({ lastName: 1 })
      query.exec((err, clients) => {
        if (err || !clients) {
          console.error('could not fetch clients')
        } else {
          res.json(clients)
        }
      })
    }
  })

  /*
   *  EXERCISES
   */

  // create a new exercise
  app.post('/api/exercises', (req, res) => {
    console.log('POST /api/exercises')
    if (req.isAuthenticated() && req.user) {
      const exercise = req.body
      delete exercise._id
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
    if (req.isAuthenticated() && req.user) {
      const exercise = req.body
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
    if (req.isAuthenticated() && req.user) {
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
    }
  })

  /*
   *  SESSIONS
   */
  // create a new session
  app.post('/api/sessions', (req, res) => {
    console.log('POST /api/sessions')
    if (req.isAuthenticated() && req.user) {
      const session = req.body
      delete session._id
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
    if (req.isAuthenticated() && req.user) {
      const session = req.body
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
    if (req.isAuthenticated() && req.user) {
      // get sessions for user based off the authenticated user's id
      const query = Session.find({ trainer: req.user._id }).sort({ time: -1 })
      query.exec((err, sessions) => {
        if (err || !sessions) {
          console.error('could not fetch sessions')
        } else {
          res.json(sessions)
        }
      })
    }
  })

  /*
   *  CLIENTS TEMPLATES
   */
  // create a new clientsTemplate
  app.post('/api/templates/clients', (req, res) => {
    console.log('POST /api/templates/clients')
    if (req.isAuthenticated() && req.user) {
      const clientsTemplate = req.body
      delete clientsTemplate._id
      clientsTemplate.trainer = req.user._id

      ClientsTemplate.create(clientsTemplate, (err, newClientsTemplate) => {
        if (err || !newClientsTemplate) {
          console.error('could not create clientsTemplate')
        } else {
          res.json(newClientsTemplate)
        }
      })
    }
  })

  // update a clientsTemplate
  app.put('/api/templates/clients', (req, res) => {
    console.log('PUT /api/templates/clients')
    if (req.isAuthenticated() && req.user) {
      const clientsTemplate = req.body
      clientsTemplate.trainer = req.user._id

      const query = ClientsTemplate.find({ _id: clientsTemplate._id })
      ClientsTemplate.findOneAndUpdate(query, clientsTemplate, (err, updatedClientsTemplate) => {
        if (err || !updatedClientsTemplate) {
          console.error('could not update clientsTemplate')
        } else {
          res.json(clientsTemplate)
        }
      })
    }
  })

  // fetch the clientsTemplates
  app.get('/api/templates/clients', (req, res) => {
    console.log('GET /api/templates/clients')
    if (req.isAuthenticated() && req.user) {
      // get clientsTemplates for user based off the authenticated user's id
      const query = ClientsTemplate.find({ trainer: req.user._id }).sort({ name: 1 })
      query.exec((err, clientsTemplates) => {
        if (err || !clientsTemplates) {
          console.error('could not fetch clientsTemplates')
        } else {
          res.json(clientsTemplates)
        }
      })
    }
  })

  /*
   *  EXERCISES TEMPLATES
   */
  // create a new exercisesTemplate
  app.post('/api/templates/exercises', (req, res) => {
    console.log('POST /api/templates/exercises')
    if (req.isAuthenticated() && req.user) {
      const exercisesTemplate = req.body
      delete exercisesTemplate._id
      exercisesTemplate.trainer = req.user._id

      ExercisesTemplate.create(exercisesTemplate, (err, newExercisesTemplate) => {
        if (err || !newExercisesTemplate) {
          console.error('could not create exercisesTemplate')
        } else {
          res.json(newExercisesTemplate)
        }
      })
    }
  })

  // update a exercisesTemplate
  app.put('/api/templates/exercises', (req, res) => {
    console.log('PUT /api/templates/exercises')
    if (req.isAuthenticated() && req.user) {
      const exercisesTemplate = req.body
      exercisesTemplate.trainer = req.user._id

      const query = ExercisesTemplate.find({ _id: exercisesTemplate._id })
      ExercisesTemplate.findOneAndUpdate(query, exercisesTemplate, (err, updatedExercisesTemplate) => {
        if (err || !updatedExercisesTemplate) {
          console.error('could not update exercisesTemplate')
        } else {
          res.json(exercisesTemplate)
        }
      })
    }
  })

  // fetch the exercisesTemplates
  app.get('/api/templates/exercises', (req, res) => {
    console.log('GET /api/templates/exercises')
    if (req.isAuthenticated() && req.user) {
      // get exercisesTemplates for user based off the authenticated user's id
      const query = ExercisesTemplate.find({ trainer: req.user._id }).sort({ name: 1 })
      query.exec((err, exercisesTemplates) => {
        if (err || !exercisesTemplates) {
          console.error('could not fetch exercisesTemplates')
        } else {
          res.json(exercisesTemplates)
        }
      })
    }
  })
}
