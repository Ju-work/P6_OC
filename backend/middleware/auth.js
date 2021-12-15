const jwt = require('jsonwebtoken')



module.exports = (req, res, next) => {
  console.log("here !!!!!");
  try {
    //Récupère seulement le token du header authorization de la requête
    const token = req.headers.authorization.split(' ')[1] 
    //Décode le token en le comparant avec celui présent dans la fonction login
    const decodedToken = jwt.verify(token, process.env.TOKEN) 
    //Récupère le userId
    const userId = decodedToken.userId 
    if (req.body.userId && req.body.userId !== userId) {
      //Vérifie s'il y a un userId dans la requête et renvoit une erreur si il est different de celui attendu
      throw new Error('403:unauthorized request') //Renvoie l'erreur
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée' })
  }
}