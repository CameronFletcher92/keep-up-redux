var faker = require('faker')
var _ = require('lodash')

module.exports = function(app) {
  const timeout = 2000

  // server-side data, refreshes on restart
  var clients = []
  var exercises = []
  for (var i = 1; i <= 20; i++) {
    clients.push( {
      _id: '' + i,
      trainer: '1',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthDate: new Date(faker.date.past()),
      avatar: faker.image.avatar()
    })
    exercises.push( {
      _id: '' + i,
      trainer: '1',
      name: faker.address.streetSuffix(),
      description: faker.lorem.sentence(),
      intensity: Math.ceil(Math.random() * 5)
    })
  }

  var user = {
    _id: '1',
    googleId: '123abc',
    firstName: 'Test',
    lastName: 'User'
  }

  // get the current user
  app.get('/api/user', function(req, res) {
    console.log('GET FAKED /api/user')
    res.json({isLoggedIn: true, user: user})
  })

  /*
   * CLIENTS
   */

  // create a fake client
  app.post('/api/clients', function(req, res) {
    console.log('POST FAKED /api/clients')
    var client = req.body
    client._id = '' + clients.length + 1
    clients.push(client)
    setTimeout(function() {
      res.json(client)
    }, timeout)
  })

  // update a fake client
  app.put('/api/clients', function(req, res) {
    console.log('PUT FAKED /api/clients')
    var client = req.body
    for (var j = 0; j < clients.length; j++) {
      if (clients[j]._id === client._id) {
        clients[j] = client
        break
      }
    }
    setTimeout(function() {
      res.json(client)
    }, timeout)
  })

  // delete a fake Client
  app.del('/api/clients', function(req, res) {
    console.log('DEL FAKED /api/clients')
    var id = req.body
    for (var j = 0; j < clients.length; j++) {
      if (clients[j]._id === id) {
        clients.splice(j, 1)
        break
      }
    }
    setTimeout(function() {
      res.json(client)
    }, timeout)
  })


  // fetch the fake clients
  app.get('/api/clients', function(req, res) {
    console.log('GET FAKED /api/clients')
    var sortedClients = _.sortBy(clients, function(c) {
        return c.lastName
    })
    setTimeout(function() {
      res.json(sortedClients)
    }, timeout)
  })

  /*
   * EXERCISES
   */

  // create a fake exercise
  app.post('/api/exercises', function(req, res) {
    console.log('POST FAKED /api/exercises')
    var exercise = req.body
    exercise._id = exercises.length + 1
    exercises.push(exercise)
    setTimeout(function() {
      res.json(req.body)
    }, timeout)
  })

  // update a fake exercise
  app.put('/api/exercises', function(req, res) {
    console.log('PUT FAKED /api/exercises')
    var exercise = req.body
    for (var j = 0; j < exercises.length; j++) {
      if (exercises[j]._id === exercise._id) {
        exercises[j] = exercise
        break
      }
    }
    setTimeout(function() {
      res.json(exercise)
    }, timeout)
  })

  // fetch the fake exercises
  app.get('/api/exercises', function(req, res) {
    console.log('GET FAKED /api/exercises')
    var sortedExercises = _.sortBy(exercises, function(c) {
      return c.name
    })
    setTimeout(function() {
      res.json(sortedExercises)
    }, timeout)
  })
}
