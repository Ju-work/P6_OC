const express = require('express')
// Création d'un router express
const router = express.Router()

const auth = require('../middleware/auth')
// multer est placé après auth pour éviter d'enregistrer les images des requêtes non authentifiées dans le serveur
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauce')

// Pour les routes utilisants le multer, on vérifie d'abord l'authentification avant de traiter le fichier image
router.post('/', auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauce)
router.post('/:id/like', auth, sauceCtrl.likedStatus)

module.exports = router
