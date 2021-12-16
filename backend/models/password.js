const passwordValidator = require('password-validator'); //Permet d'avoir des critères sur le password

const schema = new passwordValidator(); //Configuration du modèle du password
schema
  .is().min(3) //longueur minimale de 3
  .is().max(50) //longueur minimale de 50
  .has().uppercase() //Majuscule obligatoire
  .has().lowercase() //Minuscule obligatoire
  .has().digits(1) // Au moins 1 chiffre
  .has().not().spaces(); //Ne possède pas d'espace

  module.exports = passwordSchema;
 