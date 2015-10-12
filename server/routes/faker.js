var faker = require('faker')
var _ = require('lodash')

// time for queries to execute on server
const timeout = 2000

// server-side data, refreshes on restart
var clients = []
var exercises = []
var sessions = []
var user = {}

// generate random data
function seedDB() {
  user = {
    _id: 'user1',
    googleId: '123abc',
    firstName: 'Test',
    lastName: 'User'
  }

  for (var i = 1; i <= 20; i++) {
    clients.push( {
      _id: 'CL' + i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthDate: faker.date.past().toLocaleDateString(),
      address: faker.address.streetAddress() + ', ' + faker.address.city(),
      privateHealth: true,
      notes: faker.company.catchPhrase()
    })
    exercises.push( {
      _id: 'EX' + i,
      name: faker.address.streetSuffix(),
      description: faker.lorem.sentence(),
      intensity: Math.ceil(Math.random() * 5)
    })
  }

  sessions.push( {
    _id: 'SES1',
    clients: ['CL1', 'CL3', 'CL5'],
    exercises: ['EX1', 'EX3', 'EX5'],
    time: faker.date.past().toLocaleString(),
    notes: faker.company.catchPhrase()
  })

  sessions.push( {
    _id: 'SES2',
    clients: ['CL2', 'CL4', 'CL6'],
    exercises: ['EX2', 'EX4', 'EX6'],
    time: faker.date.past().toLocaleString(),
    notes: faker.company.catchPhrase()
  })

}

// generic entity methods
function addEntity(arr, entity) {
  entity._id = '' + (arr.length + 1),
  arr.push(entity)
  return entity
}

function updateEntity(arr, entity) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]._id == entity._id) {
      arr[i] = entity
      break
    }
  }

  return entity
}

function removeEntity(arr, id) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]._id == id) {
      arr.splice(i, 1)
      break
    }
  }

  return id
}

module.exports = function(app) {
  // seed the db
  seedDB()

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
    var newClient = addEntity(clients, req.body)
    setTimeout(() => res.json(newClient), timeout)
  })

  // update a fake client
  app.put('/api/clients', function(req, res) {
    console.log('PUT FAKED /api/clients')
    var updatedClient = updateEntity(clients, req.body)
    setTimeout(() => res.json(updatedClient), timeout)
  })

  // delete a fake client
  app.delete('/api/clients/:id', function(req, res) {
    var id = req.params.id
    console.log('DELETE FAKED /api/clients/' + id)
    removeEntity(clients, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake clients
  app.get('/api/clients', function(req, res) {
    console.log('GET FAKED /api/clients')
    var sortedClients = _.sortBy(clients, (c) => c.lastName)
    setTimeout(() => res.json(sortedClients), timeout)
  })

  /*
   * EXERCISES
   */

  // create a fake exercise
  app.post('/api/exercises', function(req, res) {
    console.log('POST FAKED /api/exercises')
    var newExercise = addEntity(exercises, req.body)
    setTimeout(() => res.json(newExercise), timeout)
  })

  // update a fake exercise
  app.put('/api/exercises', function(req, res) {
    console.log('PUT FAKED /api/exercises')
    var updatedExercise = updateEntity(exercises, req.body)
    setTimeout(() => res.json(updatedExercise), timeout)
  })

  // delete a fake exercise
  app.delete('/api/exercises/:id', function(req, res) {
    var id = req.params.id
    console.log('DELETE FAKED /api/exercises/' + id)
    removeEntity(exercises, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake exercises
  app.get('/api/exercises', function(req, res) {
    console.log('GET FAKED /api/exercises')
    var sortedExercises = _.sortBy(exercises, (e) => e.name)
    setTimeout(() => res.json(sortedExercises), timeout)
  })

  /*
   * SESSIONS
   */
  // create a fake session
  app.post('/api/sessions', function(req, res) {
    console.log('POST FAKED /api/sessions')
    var newSession = addEntity(sessions, req.body)
    setTimeout(() => res.json(newSession), timeout)
  })

  // update a fake session
  app.put('/api/sessions', function(req, res) {
    console.log('PUT FAKED /api/sessions')
    var updatedSession = updateEntity(sessions, req.body)
    setTimeout(() => res.json(updatedSession), timeout)
  })

  // delete a fake session
  app.delete('/api/sessions/:id', function(req, res) {
    console.log('DELETE FAKED /api/sessions/' + id)
    var id = req.params.id
    removeEntity(sessions, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake sessions
  app.get('/api/sessions', function(req, res) {
    console.log('GET FAKED /api/sessions')
    setTimeout(() => res.json(sessions), timeout)
  })
}
