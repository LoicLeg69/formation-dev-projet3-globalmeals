// Importation du module Express pour créer un routeur
const express = require("express");

// Création d'une instance de routeur Express
const router = express.Router();

/* ************************************************************************* */
// Définir les routes de l'API ici
/* ************************************************************************* */

// Importation des actions liées aux menus
const { browse, add, edit, read } = require(`../../../controllers/menuAction`);

// Route pour récupérer la liste des menus
router.get("/", browse);

// Route pour lire un menu spécifique en fonction des critères (par exemple, un filtre)
router.get("/read", read);

// Route pour ajouter un nouveau menu
router.post("/", add);

// Route pour modifier un menu existant
router.patch("/", edit);

/* ************************************************************************* */

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
