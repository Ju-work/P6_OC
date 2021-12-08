const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

//Permet de se connecter à la base de données
mongoose
  .connect(
    'mongodb+srv://ju050791:tom090303@cluster0.rjy7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) =>
    console.log(`Connexion à MongoDB échouée. Message : ${err.message}`)
  )

const app = express() //initialise express

app.use((req, res, next) => {
  //accéder a l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*')
  //autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  //envoyer des requêtes avec les méthodes suivantes
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  // Passe l'exécution au middleware suivant
  next()
})

//Remplace body-parser et analyse le corps de la requête
app.use(express.json())

module.exports = app
