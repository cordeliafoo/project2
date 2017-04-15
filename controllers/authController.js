var passport = require('../config/passportconfig')

var authController = {
  displayLoginPg: function (req, res) {
      // res.render(view, locals, callback)
    if (req.isAuthenticated()) {
      req.flash('error', 'You are already logged in')
      return res.redirect('/user/profile')
    }
    res.render('auth/login', {
      user: req.user
    })
  },

  login: function (req, res) {
    passport.authenticate('local', {
      successRedirect: '/user/profile',
      failureRedirect: '/auth/login',
      successFlash: 'Welcome back ' + req.user,
      failureFlash: 'Sorry you have entered invalid email/passowrd'
    })(req, res)
  },

  logout: function (req, res) {
    req.logout()
    req.flash('success', 'You have successfully logged out')
    res.redirect('/auth/login')
  }

}

module.exports = authController
