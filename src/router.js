// TODO
const express = require('express')
const router = express.Router()
const authController = require('./controller/auth/authController.js')

router.post('/login', authController.login)
router.post('/signup', authController.signup)

module.exports = router
