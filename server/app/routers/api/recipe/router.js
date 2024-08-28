// Importation du module Express pour créer un routeur
const express = require("express");

// Création d'une instance de routeur Express
const router = express.Router();

/* ************************************************************************* */
// Définir les routes de l'API ici
/* ************************************************************************* */

// Importation des actions liées aux recettes
const { browse, add, recipesByContinent, edit } = require(
  `../../../controllers/recipeAction`
);

// Route pour récupérer une liste de toutes les recettes
router.get("/", browse);

// Route pour récupérer les recettes en fonction du continent
router.get("/recipesByContinent", recipesByContinent);

// Route pour ajouter une nouvelle recette
router.post("/", add);

// Route pour modifier une recette existante
router.patch("/", edit);

/* ************************************************************************* */

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
