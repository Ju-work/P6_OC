const express = require('express')
const mongoose = require('mongoose')
// path, importation de Node qui donne accès au chemin des fichiers
const path = require('path')

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

// ici on ne connait pas à l'avance le chemin du fichier, on utilise la méthode path
//Pour chaque requête envoyé à images on sert ce dossier statique images
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app
