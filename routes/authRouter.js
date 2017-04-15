var express = require('express')
var router = express.Router()
var authController = require('../controllers/authController')

router.route('/login')
.get(authController.displayLoginPg)
.post(authController.login)

router.route('/logout')
.get(authController.logout)

module.exports = router
