const express = require('express')

const { loginUser, signupUser } = require('../controllers/UserController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router