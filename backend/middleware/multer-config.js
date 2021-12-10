// Package qui permet de gérer les fichiers entrants dans des requêtes http
// Ici on implémente des téléchargements de fichiers
const multer = require('multer')

// Le dictionnaire de type MIME pour ajouter une extension de fichier appropriée
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

// On créé un objet de configuration pour multer enregistré sur le disque
const storage = multer.diskStorage({
  // La fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  // Nom du fichier utilisé
  filename: (req, file, callback) => {
    // Utilise le nom d'origine en remplaçant les espaces par des uderscores
    const name = file.originalname.split(' ').join('_')
    // On se sert des extensions de fichier appropriées et on ajoute un timestamp au nom du fichier
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + '.' + extension)
  },
})

// On exporte l'élément multer entièrement configuré en lui passant la constante storage
// On lui indique que l'on gère uniquement les téléchargements de fichiers image
module.exports = multer({ storage: storage }).single('image')
