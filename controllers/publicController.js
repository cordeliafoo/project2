var express = require('express')

// pass in mergeParams to router to access params from the parent router
var router = express.Router({
  mergeParams: true
})

var event = require('../models/eventModel')

// full route: /public/events
router.get('/events', function (req, res) {
  console.log(event)
  event.find({}, function (err, event) {
    if (err) {
      return
    } else {
      res.render('publicEventsList', {event: event})
    }
  })
})

// full route: /public/events/events/:id
router.get('/events/event/:id', function (req, res) {
  event.findById(req.params.id, function (err, event) {
    if (err) {
      console.log(err)
      return
    } else {
      res.render('publicEventsList', {event: event})
    }
  })
})

// if viewer wants to join event, check if user is signed in.
// if viewer is signed in, allow to join
// if viewer is not signed in, redirect them to log in or sign up page

router.get('/events/event/:id/joinevent', function (req, res) {
  event.findById(req.params.id, function (err, event) {
    res.render('publiceventlisting', {event: event})
  })
})

router.get('/events/event/:id/yourevent', function (req, res) {
  console.log('individual event page')
  // chain .find method with exec so Mongoose will execute the query
  event.find({user: req.user.id}).exec(function (err, user) {
    res.redirect('/auth/profile/events')
  })
})

// if viewer signs up for event, update attenees array from the eventModel
// update viewer's eventsAttending array to include said event.

router.put('/events/event/:id/joinevent', function (req, res) {
  event.findOne({_id: req.params.id}, function (err, event) {
    if (err) {
      console.log(err)
      return
    } else {
      event.attendees.push(req.user._id)
      req.user.eventsAttending.push(req.params.id)
      event.save()
      req.user.save()
      res.redirect('/public/events/event/' + req.params.id)
    }
  })
})

module.exports = router
