var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')
var userLoggedIn = require('../middleware/userLoggedIn')

router.route('/signup')
.get(userController.displaySignupPg)
.post(userController.signup)

router.use(userLoggedIn)

router.route('/profile')
.get(userController.displayProfilePg)

// .post(userController.createProfile)
//
// router.route('/editprofile')
// .get(userController.seeEditProfilePg)
//
// router.route('/deleteprofile')
// .get(userController.seeDeleteProfilePg)

module.exports = router
