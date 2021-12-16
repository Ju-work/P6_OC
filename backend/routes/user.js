const express = require('express')
// Création d'un router express
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkPassword = require('../middleware/password-validator')

router.post('/signup', checkPassword, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
