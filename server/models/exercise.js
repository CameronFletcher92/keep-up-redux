const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, default: () => new Schema.Types.ObjectId() },
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  intensity: { type: Number, min: 1, max: 5 }
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
