var User = require('../models/userModel')
var image = require('../models/imageModel')
var event = require('../models/eventModel')
var passport = require('../config/passportConfig')
var express = require('express')
var router = express.Router({mergeParams: true})
var multer = require('multer')
var cloudinary = require('cloudinary')
var upload = multer({dest: './uploads/'})

// full route:  /auth/signup //
router.get('/signup', function (req, res) {
  res.render('signupForm')
})
router.post('/signup', function (req, res) {
  User.create(req.body, function (err, createduser) {
    if (err) {
      console.log(err)
      res.redirect('/auth/signup')
      return
    } else {
      res.redirect('/auth/login')
    }
  })
})

// full route:  /auth/login //
router.get('/login', function (req, res) {
  res.render('loginForm')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/profile/',
  failureRedirect: '/auth/login'
}))

// full route:  /auth/profile //
router.get('/profile', function (req, res) {
  res.render('profile')
})

// full route:  /auth/profile/events //
router.get('/profile/events', function (req, res) {
  User.findById(req.user.id)
  .populate('eventsOrganized')
  .populate('eventsAttending')
  .exec(function (err, user) {
    if (err) console.log(err)
    res.render('usereventsdashboard', {user: user})
  })
})

// full route:  /auth/profile/events/create-event  //
router.get('/profile/events/create-event', function (req, res) {
  console.log(req.user)
  res.render('createnewevent', {user: req.user})
})
router.post('/profile/events/create-event', function (req, res) {
  console.log('creating event', req.body)
  event.create({
    user: req.user.id,
    eventname: req.body.eventName,
    organizername: req.body.organizerName,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    groupsize: req.body.groupSize,
    type: req.body.type,
    numberofspots: req.body.numberOfSpots,
    status: req.body.status,
    attendees: []
  }, function (err, event) {
    if (err) {
      console.log(err)
      return
    }
    User.findById(req.user.id, function (err, user, done) {
      // console.log('user', user)
      // console.log(event._id)
      user.update({
        $push: { eventsOrganized: event._id }},
         function (err, user2) {
           console.log('saved event user', user2)
           if (err) return console.log(err)
           res.redirect('/')
         })
    })

  //   User.findByIdAndUpdate(
  //     req.user.id,
  //   { $push: { eventsOrganized: event._id}},
  //   function (err, data) {
  //     if (err) console.log(err)
  //     console.log(data)
  //   })
  //   console.log('user update')
  //   console.log('redirect')
  //   res.redirect('/auth/profile/events')
   // })
  })
})
// })
// full route:  /auth/profile/events/:id  //
router.get('/profile/events/:id', function (req, res) {
  event.findById(req.params.id, function (err, event) {
    res.render('userindividualeventpage', {event: event})
  })
})
router.delete('/profile/events/:id', function (req, res) {
  event.findOneAndRemove({_id: req.params.id}, function (err, event) {
    console.log('delete')
    if (err) {
      console.log(err)
      returns
    } else {
      User.findByIdAndUpdate(
        req.user.id,
        {'$pull': { posts: post._id }},
        function (err, event2) {
          // (err) ? req.flashreq.flash('error', 'Delete unsuccesful') : req.flash('success', 'Post deleted')
          if (err) {
            console.log(err)
            return
          }
          res.redirect('/auth/profile/events')
        })
    }
  })
})

// full route:  /auth/profile/events/:id/edit //
router.get('/profile/events/:id/edit', function (req, res) {
  event.findById(req.params.id, function (err, event) {
    res.render('editeventform', {event: event})
  })
})
router.put('/profile/events/:id/edit', function (req, res) {
  event.findOneAndUpdate({_id: req.params.id}, req.body, function (err, event) {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/auth/profile/events/' + req.params.id)
    }
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  console.log('logged out')
  res.redirect('/')
})

module.exports = router
