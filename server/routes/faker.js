'use strict'
const faker = require('faker')
const lo = require('lodash')

// time for queries to execute on server
const timeout = 2000

// server-side data, refreshes on restart
const clients = []
const exercises = []
const sessions = []
let user = {}

// generate random data
function seedDB() {
  user = {
    _id: 'user1',
    googleId: '123abc',
    firstName: 'Test',
    lastName: 'User'
  }

  for (let index = 1; index <= 20; index++) {
    clients.push({
      _id: 'CL' + index,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthDate: faker.date.past(),
      address: faker.address.streetAddress() + ', ' + faker.address.city(),
      privateHealth: true,
      notes: faker.company.catchPhrase()
    })
    exercises.push({
      _id: 'EX' + index,
      name: faker.address.streetSuffix(),
      description: faker.lorem.sentence(),
      intensity: Math.ceil(Math.random() * 5)
    })
  }

  sessions.push({
    _id: 'SES1',
    clients: ['CL1', 'CL3', 'CL5'],
    exercises: ['EX1', 'EX3', 'EX5'],
    time: faker.date.past(),
    notes: faker.company.catchPhrase()
  })

  sessions.push({
    _id: 'SES2',
    clients: ['CL2', 'CL4', 'CL6'],
    exercises: ['EX2', 'EX4', 'EX6'],
    time: faker.date.past(),
    notes: faker.company.catchPhrase()
  })
}

// generic entity methods
function addEntity(arr, entity) {
  entity._id = '' + (arr.length + 1)
  arr.push(entity)
  return entity
}

function updateEntity(arr, entity) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index]._id === entity._id) {
      arr[index] = entity
      break
    }
  }

  return entity
}

function removeEntity(arr, id) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index]._id === id) {
      arr.splice(index, 1)
      break
    }
  }

  return id
}

module.exports = (app) => {
  // seed the db
  seedDB()

  /*
   * USER
   */

  // get the current user
  app.get('/api/user', (req, res) => {
    console.log('GET FAKED /api/user')
    setTimeout(() => res.json(user), timeout)
  })


  /*
   * REPORTS
   */

  // fetch a client's report
  app.get('/api/reports/:id', (req, res) => {
    const id = req.params.id
    console.log('GET FAKED /api/reports/' + id)

    const resSessions = []
    const resExercises = {}
    let name = ''

    // determine the clients name
    for (let index = 0; index < clients.length; index++) {
      const client = clients[index]
      if (client._id === id) {
        name = client.firstName + ' ' + client.lastName
      }
    }

    // for every session, add to the result if client attended, and add all exercises
    for (let index = 0; index < sessions.length; index++) {
      const session = sessions[index]
      if (session.clients.indexOf(id) !== -1) {
        resSessions.push(session._id)
        for (let index2 = 0; index2 < session.exercises.length; index2++) {
          const exerciseId = session.exercises[index2]
          if (resExercises[exerciseId]) {
            resExercises[exerciseId] = resExercises[exerciseId] + 1
          } else {
            resExercises[exerciseId] = 1
          }
        }
      }
    }

    const result = {
      name,
      sessions: resSessions,
      exercises: resExercises
    }

    setTimeout(() => res.json(result), timeout)
  })

  /*
   * CLIENTS
   */

  // create a fake client
  app.post('/api/clients', (req, res) => {
    console.log('POST FAKED /api/clients')
    const newClient = addEntity(clients, req.body)
    setTimeout(() => res.json(newClient), timeout)
  })

  // update a fake client
  app.put('/api/clients', (req, res) => {
    console.log('PUT FAKED /api/clients')
    const updatedClient = updateEntity(clients, req.body)
    setTimeout(() => res.json(updatedClient), timeout)
  })

  // delete a fake client
  app.delete('/api/clients/:id', (req, res) => {
    const id = req.params.id
    console.log('DELETE FAKED /api/clients/' + id)
    removeEntity(clients, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake clients
  app.get('/api/clients', (req, res) => {
    console.log('GET FAKED /api/clients')
    const sortedClients = lo.sortBy(clients, (client) => client.lastName)
    setTimeout(() => res.json(sortedClients), timeout)
  })

  /*
   * EXERCISES
   */

  // create a fake exercise
  app.post('/api/exercises', (req, res) => {
    console.log('POST FAKED /api/exercises')
    const newExercise = addEntity(exercises, req.body)
    setTimeout(() => res.json(newExercise), timeout)
  })

  // update a fake exercise
  app.put('/api/exercises', (req, res) => {
    console.log('PUT FAKED /api/exercises')
    const updatedExercise = updateEntity(exercises, req.body)
    setTimeout(() => res.json(updatedExercise), timeout)
  })

  // delete a fake exercise
  app.delete('/api/exercises/:id', (req, res) => {
    const id = req.params.id
    console.log('DELETE FAKED /api/exercises/' + id)
    removeEntity(exercises, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake exercises
  app.get('/api/exercises', (req, res) => {
    console.log('GET FAKED /api/exercises')
    const sortedExercises = lo.sortBy(exercises, (exercise) => exercise.name)
    setTimeout(() => res.json(sortedExercises), timeout)
  })

  /*
   * SESSIONS
   */
  // create a fake session
  app.post('/api/sessions', (req, res) => {
    console.log('POST FAKED /api/sessions')
    const newSession = addEntity(sessions, req.body)
    setTimeout(() => res.json(newSession), timeout)
  })

  // update a fake session
  app.put('/api/sessions', (req, res) => {
    console.log('PUT FAKED /api/sessions')
    const updatedSession = updateEntity(sessions, req.body)
    setTimeout(() => res.json(updatedSession), timeout)
  })

  // delete a fake session
  app.delete('/api/sessions/:id', (req, res) => {
    const id = req.params.id
    console.log('DELETE FAKED /api/sessions/' + id)
    removeEntity(sessions, id)
    setTimeout(() => res.json(id), timeout)
  })

  // fetch the fake sessions
  app.get('/api/sessions', (req, res) => {
    console.log('GET FAKED /api/sessions')
    setTimeout(() => res.json(sessions), timeout)
  })
}
