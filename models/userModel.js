var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    require: true
  },

  age: {
    type: Number
  },

  gender: {
    type: String
  },

  instruments: {
    type: String
  },

  memberSince: {
    type: Date,
    default: Date.now()
  }

})

userSchema.pre('save', function (next) {
  var user = this
  // only hash the password if the password is new or has been modified
  if (!user.isModified('password')) return next

  var hashedPassword = bcrypt.hashSync(user.password, 10)
  user.password = hashedPassword
  next()
})

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
