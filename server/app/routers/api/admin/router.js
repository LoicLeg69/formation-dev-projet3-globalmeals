// Importation du module Express pour créer un routeur
const express = require("express");

// Création d'une instance de routeur Express
const router = express.Router();

/* ************************************************************************* */
// Définir les routes de l'API ici
/* ************************************************************************* */

// Importation de la fonction de gestion de la soumission de formulaire à partir du contrôleur
const { handleFormSubmission } = require("../../../controllers/adminAction");


// Définition des routes POST pour la soumission de formulaires
// Route pour soumettre un formulaire pour "menu"
router.post("/menu", handleFormSubmission);
// Route pour soumettre un formulaire pour "recipe"
router.post("/recipe", handleFormSubmission);

/* ************************************************************************* */

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
