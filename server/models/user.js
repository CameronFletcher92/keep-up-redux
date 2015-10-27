const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, default: () => new Schema.Types.ObjectId() },
  googleId: { type: String, index: true },
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('User', UserSchema)
