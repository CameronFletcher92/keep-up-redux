const Client = require('../models/client')
const Exercise = require('../models/exercise')

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
      client.trainer = req.user._id

      Client.create(client, (err, newClient) => {
        if (err || !newClient) {
          console.error('could not create client')
        } else {
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

      Client.findOneAndUpdate(query, client, (err, updatedClient) => {
        if (err || !updatedClient) {
          console.error('could not update client')
        } else {
          res.json(updatedClient)
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
      const query = Exercise.find({ _id: exercise._id })

      Exercise.findOneAndUpdate(query, exercise, (err, updatedExercise) => {
        if (err || !updatedExercise) {
          console.error('could not update exercise')
        } else {
          res.json(updatedExercise)
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
}
