var passport = require('../config/passportconfig')
var User = require('../models/userModel')
var mongoose = require('mongoose')

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
        req.flash('error', req.body.email + ' Signup was unsuccessful.  Please try again.')
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
      user: req.user,
      flash: req.flash()
    })
  },

  displayEditProfilePg: function (req, res) {
    // his userController.edit
    res.render('user/editProfile', {
      user: req.user
    })
  },

  editProfile: function (req, res) {
    // his userController.update
    console.log(req.user.name)
    User.findOneAndUpdate({
      _id: req.user.id
    }, {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      instruments: req.body.instruments
    }, function (err, userEdit) {
      if(err) {
        res.redirect('/user/editprofile')
      } else {
        req.flash('success', 'Profile has been successfully updated')
        res.redirect('/user/profile')
      }
    })
  },
  deleteAccount: function (req, res) {
    User.findByIdAndRemove(req.user.id, function (err, removedUser) {
      if (err) {
        req.flash('error', 'Sorry, unable to delete ' + req.user.name + "'s account'")
        res.redirect('/user/profile')
      } else {
        req.flash('success', req.user.name + "'s account has been deleted'")
        res.redirect('/auth/login')
      }
    })
  }

}

module.exports = userController
