var express = require('express')
var router = express.Router()
var eventController = require('../controllers/eventController')
var attendanceController = require('../controllers/attendanceController')

// router.route('/list')
// .get(eventController.seeAllEventsPg)
//
//
// router.route('/new')
// .get(eventController.seeMakeNewEventPage)
//
// router.route('/search')
// .post(eventController.findEvent)
//
// router.route('/:id')
// .get(eventController.showEventPage)
//
// router.route('/:id/edit')
// .get(eventController.showEditEventPage)
// .post(eventController.editEvent)
//
// router.route('/:id/join')
// .get(eventController.attendanceController.join)
//
// router.route('/:id/withdraw')
// .get(eventController.attendanceController.withdraw)

module.exports = router
