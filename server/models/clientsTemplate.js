'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientsTemplateSchema = new Schema({
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
})

module.exports = mongoose.model('ClientsTemplate', ClientsTemplateSchema)
