'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExercisesTemplateSchema = new Schema({
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
})

module.exports = mongoose.model('ExercisesTemplate', ExercisesTemplateSchema)
