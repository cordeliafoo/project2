var mongoose = require('mongoose');
var User = require('../models/userModel')

var imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },

  username: [{
    type: String,
    ref: 'User'
  }],

  title: {
    type: String
  },

  description: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },

  imageproperties:{
    type: String
  }
})

var Image = mongoose.model('Image', imageSchema)

module.exports = Image
