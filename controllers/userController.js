var passport = require('../config/passportconfig')
var User = require('../models/userModel')

var userController = {
  displaySignupPg: function (req, res) {
    res.render('user/signup', {
      user: req.user
    })
  },

  signup: function (req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, function (err, createdUser) {
      if (err) {
        req.flash('error', 'Error creating user')
        res.redirect('/user/signup')
      } else {
        // allow user to be logged in right after signin up
        // calling authenticate within the route handler rather than passport being used as a route middleware
        passport.authenticate('local', {
          successRedirect: '/user/profile',
          successFlash: "Welcome to Let's Jam!"
        })(req, res)  // passport.authenticate returns a function that takes arguements(req, res).   evoke this function with (req, res) to continue the app's request-response cycle
      }
    })
  },

  displayProfilePg: function (req, res) {
    res.render('user/index', {
      user: req.user
    })
  }
}

module.exports = userController
