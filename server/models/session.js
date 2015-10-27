'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  notes: String,
  clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
})

module.exports = mongoose.model('Session', SessionSchema)
