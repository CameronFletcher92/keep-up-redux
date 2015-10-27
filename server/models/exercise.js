const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  intensity: { type: Number, min: 1, max: 5 }
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
