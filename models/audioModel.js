var mongoose = require('mongoose')
var User = require('../models/userModel')

var audioSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String},
  description: {type: String},
  date: {type: Date, default: Date.now},
  audioProperties: {type: String}
})

var Audio = mongoose.model('Audio', audioSchema)
module.exports = Audio
