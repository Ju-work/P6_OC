const express = require('express')
// Création d'un router express
const router = express.Router()

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;