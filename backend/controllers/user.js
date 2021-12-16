//Permet de crypter le mot de passe
const bcrypt = require('bcrypt')
//Permet de créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken')
const User = require('../models/user')
//const emailValidator = require('email-validator')

require('dotenv').config()

// exports.signup = (req, res, next) => {
//   if (!emailValidator.validate(req.body.email)) {
//     //si l'email n'est pas valide alors
//     return res
//       .status(401)
//       .json({ message: 'Veuillez entrer une adresse email valide' })
//   }

//   if (!schema.validate(req.body.password)) {
//     //Si le password n'est pas valide // au schema
//     return res
//       .status(401)
//       .json({
//         message:
//           "Le mot de passe doit avoir une longueur de 3 a 50 caractères avec au moins un chiffre, une minuscule, une majuscule et ne possédant pas d'espace !!!",
//       })
//   }

//   bcrypt
//     .hash(req.body.password, 10) //Permet de hash le password avec un salage de 10 tours
//     .then((hash) => {
//       const user = new User({
//         //Créé un nouvel utilisateur
//         email: req.body.email,
//         password: hash,
//       })

//       user
//         .save() //Sauvegarde dans la base de données
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch((error) => res.status(400).json({ error }))
//     })
//     .catch((error) => res.status(500).json({ error }))
// }

// exports.login = (req, res, next) => {
//   console.log('start login')
//   User.findOne({ email: req.body.email }) //Recherche l'email utilisateur dans la base de données
//     .then((user) => {
//       console.log('user not found')
//       if (!user) {
//         //S'il n'existe pas alors
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' })
//       }
//       bcrypt
//         .compare(req.body.password, user.password) //Compare le password utilisateur avec celui enregistré dans la base de données
//         .then((valid) => {
//           if (!valid) {
//             //Si différent alors
//             console.log('user not valid')
//             return res.status(401).json({ error: 'Mot de passe incorrect !' })
//           }
//           res.status(200).json({
//             //Sinon on renvoie cet objet
//             userId: user._id,
//             token: jwt.sign(
//               { userId: user._id }, //Données encodés
//               process.env.TOKEN, //Clé secrete
//               { expiresIn: '24h' } //Durée d'expiration du token
//             ),
//           })
//         })
//         .catch((error) => res.status(500).json({ error }))
//     })
//     .catch((error) => res.status(500).json({ error }))
// }

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) =>
          res
            .status(400)
            .json({ message: 'Un compte existe déjà avec cet Email.' })
        )
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: '24h',
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
