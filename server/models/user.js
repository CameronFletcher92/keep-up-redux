const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  googleId: { type: String, index: true },
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('User', UserSchema)
